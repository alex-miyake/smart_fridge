/**
 * @file Handles user authentication: registration, login, logout.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config();

// Generate JWT tokens
const generateAccessToken = (user) => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });

/**
 * Registers a new user.
 * @route POST /api/auth/register
 * @param {Object} req.body - The user data (email, password).
 * @returns {Object} 201 - Created user without password.
 */
exports.registerUser = async (req,res) => {
    const { username, email, password } = req.body;

    try {
        // see if user email already exists
        const userExists = await User.findOne({ where: {email} });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user entry
        const user = await User.create({
            username, 
            email,
            password: hashedPassword,
        });

        // Respond with token and user info 
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateAccessToken(user.id),
        });
        } catch (error) {
            console.error("Error during user registration:", error); // Log to console / docker logs
            console.error(error.stack); // Log to trace 
            res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Logs in a user, returns access and refresh tokens.
 * @route POST /api/auth/login
 * @param {Object} req.body - The login credentials (email, password).
 * @returns {Object} 200 - Access and refresh tokens.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ where: {email} });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // refresh password after login
    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    
    await user.update({ refreshToken: refreshToken });

    // store refresh token for logout
    res.json({ accessToken, refreshToken });

    // Send response
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accesstoken: accessToken,
      refreshtoken: refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Logs out a user by removing the refresh token.
 * @route POST /api/auth/logout
 * @param {Object} req.body - Contains refresh token.
 * @returns {Object} 200 - Logout confirmation.
 */
exports.logoutUser = async(req,res) => {
  try{
    const {refreshToken} = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'refresh token required'});
  
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(204);

    await user.update({ refreshToken: null });

    res.status(200).json({ message: 'Logged out successfully' });
  }
  catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error'});
  }
};
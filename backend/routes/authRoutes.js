/**
 * @file authRoutes.js
 * @description Routes related to user authentication including registration, login, logout, and token refreshing.
 *              Includes request validation for inputs like email and password.
 * 
 * ## Routes:
 * - POST /api/auth/register → Registers a new user.
 * - POST /api/auth/login → Logs in a user and issues tokens.
 * - POST /api/auth/logout → Logs out a user by invalidating their refresh token.
 * - POST /api/auth/refresh-token → Issues a new access token using a valid refresh token.
 * 
 * ## Dependencies:
 * @module routes/authRoutes
 * @requires express  Express router for defining routes.
 * @requires jsonwebtoken   For verifying and signing JWT and refresh tokens.
 * @requires ../controllers/authController  Authentication controller with route logic.
 * @requires ../validators/authValidator    Validation rules for login and registration.
 * @requires ../middleware/validateRequest  Middleware to handle validation errors.
 */
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const { logoutUser } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user, using data validation.
 * @access Public
 */
router.post('/register', registerValidation, validateRequest, registerUser);

/**
 * @route POST /api/auth/login
 * @desc Log in an existing user and return tokens
 * @access Public
 */
router.post('/login', loginValidation, validateRequest, loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Log out user by invalidating refresh token
 * @access Public (token-based control in controller)
 */
router.post('/logout', logoutUser);

/**
 * @route POST /api/auth/refresh-token
 * @desc Get a new access token using a refresh token
 * @access Public
 */
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});

module.exports = router;
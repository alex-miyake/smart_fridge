/**
 * @file authMiddleware.js
 * @description Middleware to authenticate users via JWT. 
 *              It checks for a valid Bearer token in the Authorization header, 
 *              verifies it, and attaches the authenticated user to the request object.
 *
 * ## Usage:
 * Apply this middleware to any protected route to ensure only authenticated users can access it.
 *
 * ## Example:
 * router.get('/protected', authenticate, controller.protectedRoute);
 *
 * ## Dependencies:
 * @requires jsonwebtoken  For verifying the JWT token.
 * @requires ../models/user  Mongoose User model to retrieve user data.
 * @requires dotenv  Loads environment variables from .env file.
 *
 * @module middleware/authMiddleware
 */
const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check request header has token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorised: No token provided' })
    }

    const token = authHeader.split(' '[1]);

    // verify bearer token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
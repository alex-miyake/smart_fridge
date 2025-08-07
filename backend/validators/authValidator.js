/**
 * @file authValidator.js
 * @description Validation middleware for user authentication input using express-validator.
 *              This includes input checks for registration and login routes.
 * 
 * @module validators/authValidator
 */

const { body } = require('express-validator');

/**
 * Validation chain for user registration.
 *
 * Validates:
 * - `email`: must be a valid email format.
 * - `password`: must be at least 6 characters long.
 * - `username`: must not be empty.
 *
 * @returns {Array} Array of express-validator middleware functions.
 */
exports.registerValidation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
];

/**
 * Validation chain for user login.
 *
 * Validates:
 * - `email`: must be a valid email format.
 * - `password`: must not be empty.
 *
 * @returns {Array} Array of express-validator middleware functions.
 */
exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
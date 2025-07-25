/**
 * @file userValidator.js
 * @description Validation middleware for user-related input data using express-validator.
 *              Ensures fields like username, email, and password are correctly formatted and not empty
 *              before being processed in user creation or updates.
 *
 * @module validators/userValidator
 */
const { body } = require('express-validator');

exports.createUserValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('email')
    .isEmail()
    .withMessage('A valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

exports.updateUserValidation = [
  body('username')
    .optional()
    .notEmpty()
    .withMessage('Username cannot be empty if provided'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid if provided'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters if provided'),
];
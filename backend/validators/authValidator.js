/**
 * @file Checks that data entered for registration and login is valid, using Express validator
 */

const { body } = require('express-validator');

exports.registerValidation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
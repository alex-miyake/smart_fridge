/**
 * @file mealPostValidator.js
 * @description Validation middleware for creating and updating meal posts using express-validator.
 *              Ensures that input data such as title, ingredients, and descriptions meet required formats 
 *              before being processed by the controller. Helps maintain data integrity and improves security.
 *
 * @module validators/mealPostValidator
 */

const { body } = require('express-validator');

exports.createMealPostValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('ingredientsUsed')
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),

  body('ingredientsUsed.*.name')
    .notEmpty()
    .withMessage('Each ingredient must have a name'),

  // Might change to allow words (one, half, third etc.)
  body('ingredientsUsed.*.quantity')
    .optional()
    .isNumeric()
    .withMessage('Quantity must be a number'),


  body('ingredientsUsed.*.unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string'),

  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
];

exports.updateMealPostValidation = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('ingredientsUsed')
    .optional()
    .isArray()
    .withMessage('IngredientsUsed must be an array'),

  body('ingredientsUsed.*.name')
    .optional()
    .notEmpty()
    .withMessage('Each ingredient must have a name'),

    // Might change later
  body('ingredientsUsed.*.quantity')
    .optional()
    .isNumeric()
    .withMessage('Quantity must be a number'),

  body('ingredientsUsed.*.unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string'),

  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
];
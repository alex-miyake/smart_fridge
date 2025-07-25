/**
 * @file recipeValidator.js
 * @description Validation middleware for handling input data related to recipe creation and updates.
 *              Utilizes express-validator to enforce rules on fields like name, ingredients, instructions,
 *              and source URL to ensure submitted recipe data is valid and consistent.
 *
 * @module validators/recipeValidator
 */
const { body } = require('express-validator');

exports.createRecipeValidation = [
  body('name')
    .notEmpty()
    .withMessage('Recipe name is required'),

  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array of strings'),

  body('instructions')
    .notEmpty()
    .withMessage('Instructions are required'),

  body('sourceUrl')
    .optional()
    .isURL()
    .withMessage('Source URL must be a valid URL'),
];

exports.updateRecipeValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Recipe name cannot be empty'),

  body('ingredients')
    .optional()
    .isArray()
    .withMessage('Ingredients must be an array of strings'),

  body('instructions')
    .optional()
    .notEmpty()
    .withMessage('Instructions cannot be empty'),

  body('sourceUrl')
    .optional()
    .isURL()
    .withMessage('Source URL must be a valid URL'),
];
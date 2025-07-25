/**
 * @file fridgeValidator.js
 * @description Validation middleware for creating and updating fridge items using express-validator.
 *              Ensures that all required fields are properly formatted and valid before processing.
 * 
 * @module validators/fridgeValidator
 */
const { body } = require('express-validator');

/**
 * Validation rules for creating fridge items. 
 */
exports.createFridgeItemValidation = [
  body('name')
    .notEmpty()
    .withMessage('Item name is required'),

  body('quantity')
    .optional()
    .isNumeric()
    .withMessage('Quantity must be a number'),

  body('unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string'),

  body('expiryDate')
    .notEmpty()
    .withMessage('Expiry date is required')
    .isISO8601()
    .withMessage('Expiry date must be a valid ISO date'),
];

/**
 * Validation rules for updating a fridge item
 */
exports.updateFridgeItemValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Item name cannot be empty'),

  body('quantity')
    .optional()
    .isNumeric()
    .withMessage('Quantity must be a number'),

  body('unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string'),

  body('expiryDate')
    .optional()
    .isISO8601()
    .withMessage('Expiry date must be a valid ISO date'),
];
/**
 * @file validateRequest.js
 * @description Middleware to handle validation result errors from express-validator.
 *              It checks for any validation errors in the request and returns a 400
 *              Bad Request response with error details if validation fails.
 * 
 * ## Usage:
 * Use this middleware after validation chains in route definitions to intercept and
 * handle any validation issues before reaching the controller logic.
 * 
 * ## Example:
 * router.post('/register', registerValidation, validateRequest, authController.registerUser);
 * 
 * ## Dependencies:
 * @requires express-validator.validationResult  Retrieves the result of validation chains.
 *  
 * @module middleware/validateRequest
 */
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequest;
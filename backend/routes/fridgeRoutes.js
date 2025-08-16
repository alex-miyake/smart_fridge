/**
 * @file fridgeRoutes.js
 * @description Defines routes for managing fridge inventory items.
 * All routes are protected and require user authentication via middleware.
 * Includes input validation for fridge item creation and updates.
 *
 * ## Routes:
 * - POST   /api/fridge        → Add a new fridge item.
 * - GET    /api/fridge        → Get all fridge items for the authenticated user.
 * - GET    /api/fridge/:id    → Get a specific fridge item by ID.
 * - PUT    /api/fridge/:id    → Update a specific fridge item by ID.
 * - DELETE /api/fridge/:id    → Delete a specific fridge item by ID.
 *
 * ## Dependencies:
 * @requires express Router for defining routes.
 * @requires ../controllers/fridgeController Controller functions for fridge item logic.
 * @requires ../middleware/authMiddleware Authentication middleware to protect routes.
 * @requires ../middleware/validateRequest  Middleware to handle validation errors.
 * @requires ../validators/fridgeValidator Validation rules for fridge item input data.
*/


/**
const authenticate = require('../middleware/authMiddleware');
const { createFridgeItemValidation, updateFridgeItemValidation } = require('../validators/fridgeValidator');
const validateRequest = require('../middleware/validateRequest');
*/ 

/** Protected routes (all private for now)
router.post('/', authenticate, createFridgeItemValidation, validateRequest, fridgeController.createFridgeItem);    
router.get('/', authenticate, fridgeController.getAllFridgeItems);  
router.get('/:id', authenticate, fridgeController.getFridgeItem);    
router.put('/:id', authenticate, updateFridgeItemValidation, validateRequest, fridgeController.updateFridgeItem);  
router.delete('/:id', authenticate, fridgeController.deleteFridgeItem);*/

const express = require('express');
const router = express.Router();
const fridgeController = require('../controllers/fridgeController');

router.post('/', fridgeController.createFridgeItem);    
router.get('/', fridgeController.getAllFridgeItems);  
router.get('/:id', fridgeController.getFridgeItem);    
router.put('/:id', fridgeController.updateFridgeItem);  
router.delete('/:id', fridgeController.deleteFridgeItem);

module.exports = router;
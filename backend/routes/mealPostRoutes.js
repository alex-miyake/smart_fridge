/**
 * @file mealPostRoutes.js
 * @description Defines API routes for managing meal posts within the application.
 * 
 * This router handles both public and protected endpoints for CRUD operations on user-submitted meal posts.
 * Initially, all users can view posts publicly, but access control may be restricted to friends in future updates.
 *
 * ### Public Routes:
 * GET    /api/mealposts           → Retrieve all meal posts (public view, may change).
 * GET    /api/mealposts/:id       → Retrieve a single meal post by its ID.
 * 
 * ### Protected Routes (Require JWT Authentication):
 * POST   /api/mealposts           → Create a new meal post (authenticated users only).
 * PUT    /api/mealposts/:id       → Update an existing meal post by ID (must be owner).
 * DELETE /api/mealposts/:id       → Delete a meal post by ID (must be owner).
 * 
 * ## Dependencies:
 * @requires express.Router() for route definition
 * @requires mealPostController for business logic
 * @requires authMiddleware to protect certain endpoints
 * @requires ../middleware/validateRequest Middleware to handle validation errors
 * @requires ../validators/mealPostValidator Validation rules for meal post input parameters.
 */

const express = require('express');
const router = express.Router();
const mealPostController = require('../controllers/mealPostController');
const authenticate = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest.js')
const { createMealPostValidation, updateMealPostValidation } = require('../validators/mealPostValidator') 

// Public routes (change permissions later so only friends can view all posts)
router.get('/', mealPostController.getAllMealPosts);
router.get('/:id', mealPostController.getMealPost);

// Protected routes
router.post('/', authenticate, createMealPostValidation, validateRequest, mealPostController.createMealPost);
router.put('/:id', authenticate, updateMealPostValidation, validateRequest, mealPostController.updateMealPost);
router.delete('/:id', authenticate, mealPostController.deleteMealPost);

module.exports = router;
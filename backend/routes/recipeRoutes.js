/**
 * @file recipeRoutes.js
 * @description Defines API endpoints for managing recipes in the application.
 *
 * This router provides both public and protected routes for CRUD operations on recipe data.
 * Public routes allow browsing and viewing individual recipes.
 * Protected routes require authentication and allow users to create, update, and delete their own recipes.
 * Includes input validation for creating and updating recipes.
 * 
 * Permissions may be extended in the future to restrict recipe access based on subscription status or sharing settings.
 *
 * ### Public Routes:
 * GET    /api/recipes           → Retrieve all recipes (public access).
 * GET    /api/recipes/:id       → Retrieve a single recipe by its ID.
 *
 * ### Protected Routes (Require JWT Authentication):
 * POST   /api/recipes           → Create a new recipe (authenticated users only).
 * PUT    /api/recipes/:id       → Update an existing recipe by ID (must be owner).
 * DELETE /api/recipes/:id       → Delete a recipe by ID (must be owner).
 *
 * ## Dependencies:
 * @requires express.Router() for route handling
 * @requires recipeController for recipe logic
 * @requires authMiddleware to enforce route protection
 * @requires middleware/ValidateRequest Middleware to handle validation errors.
 * @requires validators/recipeValidator Validation rules for recipe creation/update input data.
 */
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authenticate = require('../middleware/authMiddleware');
const { createRecipeValidation, updateRecipeValidation } = require('../validators/recipeValidator');
const validateRequest = require('../middleware/validateRequest');

// Public routes (can add permissions for subscriptions later)
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);

// Protected routes
router.post('/', authenticate, createRecipeValidation, validateRequest, recipeController.createRecipe);
router.put('/:id', authenticate, updateRecipeValidation, validateRequest, recipeController.updateRecipe);
router.delete('/:id', authenticate, recipeController.deleteRecipe);

module.exports = router;
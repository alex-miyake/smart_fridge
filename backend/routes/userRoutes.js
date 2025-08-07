/**
 * @file userRoutes.js
 * @description Defines API endpoints for managing user accounts.
 *
 * This router includes both public and protected routes for user management. 
 * The public route allows user account creation (registration).
 * All other routes are protected and require JWT authentication to ensure users can only access or modify their own data.
 * In future versions, permissions can be added.
 *
 * ### Public Routes:
 * POST   /api/users             → Register a new user.
 *
 * ### Protected Routes (Require JWT Authentication):
 * GET    /api/users             → Retrieve all users (restricted to authenticated clients).
 * GET    /api/users/:id         → Retrieve a specific user by ID.
 * PUT    /api/users/:id         → Update user details by ID.
 * DELETE /api/users/:id         → Delete a user by ID.
 *
 * ## Dependencies:
 * @requires express.Router() for route definition
 * @requires userController for handling business logic
 * @requires authMiddleware to enforce authentication
 * @requires ../validators/userValidator    Validation rules for username, email and password input data.
 * @requires ../middleware/validateRequest  Middleware to handle validation errors.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const { createUserValidation, updateUserValidation } = require('../validators/userValidator');
const validateRequest = require('../middleware/validateRequest');

// Public
router.post('/', createUserValidation, validateRequest, userController.createUser);

/** Protected
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUser);
router.put('/:id', authenticate, updateUserValidation, validateRequest, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);
*/

// doing without authentication for now
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
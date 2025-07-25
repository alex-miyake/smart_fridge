/**
 * @file CRUD operations for meal Post resource.
 */

const { MealPost } = require('../models/MealPost');

/**
 * Creates a new meal post.
 * @route POST /api/meals
 * @description Allows a user to share a meal they cooked, with optional image and description.
 * @access Private
 */
exports.createMealPost = async (req, res) => {
  try {
    const meal = await MealPost.create(req.body);
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves all meal posts.
 * @route GET /api/meals
 * @description Returns a list of all shared meal posts.
 * @access Public or Private (depending on visibility rules, will change later for friends)
 */
exports.getAllMealPosts = async (req, res) => {
  try {
    const meals = await MealPost.findAll();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a specific meal post by ID.
 * @route GET /api/meals/:id
 * @description Fetches detailed information for a single meal post.
 * @access Public or Private
 */
exports.getMealPost = async (req, res) => {
  try {
    const meal = await MealPost.findByPk(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Updates a specific meal post by ID.
 * @route PUT /api/meals/:id
 * @description Allows a user to edit their previously shared meal.
 * @access Private
 */
exports.updateMealPost = async (req, res) => {
  try {
    const [updated] = await MealPost.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Meal not found' });
    const updatedMeal = await MealPost.findByPk(req.params.id);
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Deletes a specific meal post by ID.
 * @route DELETE /api/meals/:id
 * @description Removes a meal post from the platform.
 * @access Private
 */
exports.deleteMealPost = async (req, res) => {
  try {
    const deleted = await MealPost.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
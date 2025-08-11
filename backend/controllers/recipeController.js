/**
 * @file CRUD operations for Recipe resource.
 */

const Recipe = require('../models/Recipe');

/**
 * Creates a new recipe.
 * @route POST /api/recipes
 */
exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
s
/**
 * Retrieves all recipes.
 * @route GET /api/recipes
 */
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a single recipe by ID.
 * @route GET /api/recipes/:id
 */
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 *  Updates a single recipe by ID.
 * @route PUT /api/recipes/:id
 */
exports.updateRecipe = async (req, res) => {
  try {
    const [updated] = await Recipe.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });
    const updatedRecipe = await Recipe.findByPk(req.params.id);
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 *  Deletes a single recipe by ID.
 * @route DELETE /api/recipes/:id
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
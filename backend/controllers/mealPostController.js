const { MealPost } = require('../models/MealPost');

exports.createMealPost = async (req, res) => {
  try {
    const meal = await MealPost.create(req.body);
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMealPosts = async (req, res) => {
  try {
    const meals = await MealPost.findAll();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMealPost = async (req, res) => {
  try {
    const meal = await MealPost.findByPk(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.deleteMealPost = async (req, res) => {
  try {
    const deleted = await MealPost.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
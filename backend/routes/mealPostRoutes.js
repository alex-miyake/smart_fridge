const express = require('express');
const router = express.Router();
const mealPostController = require('../controllers/mealPostController');

router.post('/', mealPostController.createMealPost);
router.get('/', mealPostController.getAllMealPosts);
router.get('/:id', mealPostController.getMealPost);
router.put('/:id', mealPostController.updateMealPost);
router.delete('/:id', mealPostController.deleteMealPost);

module.exports = router;
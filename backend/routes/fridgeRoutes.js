const express = require('express');
const router = express.Router();
const fridgeController = require('../controllers/fridgeController');

router.post('/', fridgeController.createFridgeItem);    // add new item
router.get('/', fridgeController.getAllFridgeItems);    // See all items
router.get('/:id', fridgeController.getFridgeItem);     // See 1 item
router.put('/:id', fridgeController.updateFridgeItem);  // Update item
router.delete('/:id', fridgeController.deleteFridgeItem); // Removed item

module.exports = router;
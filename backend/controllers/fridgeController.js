/**
 * @file CRUD operations for meal Post resource.
 */
const Fridge = require('../models/Fridge');

/**
 * Creates a new item in the user's fridge inventory.
 * @route POST /api/fridge
 * @description Logs a new fridge item with quantity, unit, and expiry date.
 * @access Private
 */
exports.createFridgeItem = async (req, res) => {
    try {
        const item = await Fridge.create(req.body);
        res.status(201).json(item);
    }
    catch (err) {
        res.status (400).json({ error:err.message });
    }
};

/**
 * Retrieves all fridge items for the authenticated user.
 * @route GET /api/fridge
 * @description Fetches the complete fridge inventory for the current user.
 * @access Private
 */
exports.getAllFridgeItems = async (req, res) => {
    try {
        const items = await Fridge.findAll();
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieves a single fridge item by ID.
 * @route GET /api/fridge/:id
 * @description Fetches a specific ingredient in the user’s fridge.
 * @access Private
 */
exports.getFridgeItem = async (req,res) => {
    try {
        const item = await Fridge.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found'});
        res.json(item);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Updates a specific fridge item by ID.
 * @route PUT /api/fridge/:id
 * @description Modifies the quantity, expiry, or unit of an item.
 * @access Private
 */
exports.updateFridgeItem = async (req,res) => {
    try {
        const item = await Fridge.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found'});
        await item.update(req.body);
        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};


/**
 * Deletes a specific fridge item by ID.
 * @route DELETE /api/fridge/:id
 * @description Removes an item from the fridge inventory.
 * @access Private
 */
exports.deleteFridgeItem = async (req,res) => {
    try {
        const item = await Fridge.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found'});
        await item.destroy();
        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
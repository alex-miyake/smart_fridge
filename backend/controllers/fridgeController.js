/**
 * @file CRUD operations for meal Post resource.
 */

// Using model injection not the raw file anymore. 
//const Fridge = require('../models/Fridge'); 

let Fridge;

exports.setModels = (models) => {
  Fridge = models.Fridge;
};


/**
 * Creates a new item in the user's fridge inventory.
 * @route POST /api/fridge
 */
exports.createFridgeItem = async (req, res) => {
    console.debug("[DEBUG] Incoming request body:", req.body);
    try {
        const { name, quantity, unit, expiryDate, userId } = req.body;
        
        // Explicitly map 'userId' to 'UserId' from frontend request
        const item = await Fridge.create({
            name,
            quantity,
            unit,
            expiryDate,
            UserId: userId 
        });
        res.status(201).json(item);
    }
    catch (err) {
        console.error("[DEBUG] Sequelize error:", err);
        res.status (400).json({ error:err.message });
    }
};

/**
 * Retrieves all fridge items for the authenticated user.
 * @route GET /api/fridge
 */
exports.getAllFridgeItems = async (req, res) => {
    try {
        console.log('GET /api/fridge called');
        console.log('Fridge model:', !!Fridge);
        console.log('typeof Fridge.findAll:', typeof Fridge.findAll);
        
        const items = await Fridge.findAll();
        res.status(200).json(items);
    }
    catch (err) {
        console.error('Error in GET /api/fridge handler:', err && err.stack ? err.stack : err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieves a single fridge item by ID.
 * @route GET /api/fridge/:id
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
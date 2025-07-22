const Fridge = require('../models/Fridge');

// Create item
exports.createFridgeItem = async (req, res) => {
    try {
        const item = await Fridge.create(req.body);
        res.status(201).json(item);
    }
    catch (err) {
        res.status (400).json({ error:err.message });
    }
};

// Read all items
exports.getAllFridgeItems = async (req, res) => {
    try {
        const items = await Fridge.findAll();
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read one item
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

// Change item
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


// Remove item
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
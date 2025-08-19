/**
 * @file Single Express app, called by server file and index file (for testing). 
 * 
 * Exports function, accepts database models as a parameter. 
 */

const express = require('express');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
const fridgeController = require('./controllers/fridgeController');
const userController = require('./controllers/userController');
const app = express();

module.exports = (models) => {
    // Inject the models into the controllers
    fridgeController.setModels(models);
    userController.setModels(models);

    // middleware
    app.use(express.json());

    // Define routes
    app.use('/api/fridge', fridgeRoutes);
    app.use('/api/users', userRoutes);

    // Optional test API
    app.post('/test', (req, res) => {
        res.json({
            message: 'POST received!',
            data: req.body
        });
    });

    // Basic error handler
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    });

    return app;
};
/**
 * @file server.js
 * @description Main application file. Sets up the Express app, middleware, routes, logging, and starts the server.
 * 
 * Responsibilities:
 * - Loads environment variables.
 * - Initializes Express application.
 * - Applies JSON parsing middleware.
 * - Applies logging middleware (to console and to file).
 * - Mounts API route handlers for authentication, fridge items, users, meal posts, and recipes.
 * - Handles root and test routes for basic health checks.
 * - Syncs Sequelize models with the PostgreSQL database.
 * - Starts listening on the defined port.
 * 
 * @requires express Creates the app and HTTP routes.
 * @requires dotenv Loads environment variables.
 * @requires morgan Logs HTTP requests.
 * @requires fs Creates stream for writing logs to a file.
 * @requires path Resolves file paths.
 * @requires ./routes/authRoutes Contains login and register route handlers.
 * @requires ./config/db Sequelize instance connected to PostgreSQL.
 * @requires ./utils/logger Winston logger for app-level logging.
 * @requires model files Loads all Sequelize models so they are registered before syncing.
 * 
 * @usage
 * Run with: `node server.js`
 */

const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');
const fridgeRoutes = require('./routes/fridgeRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPostRoutes = require('./routes/mealPostRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// HTTP request logging to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Logging HTTP requests to console (might remove)
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/fridge', fridgeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meals', mealPostRoutes);
app.use('/api/recipes', recipeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('test route successful! bumba');
});

// Optional test API
app.post('/test', (req, res) => {
  res.json({
    message: 'POST received!',
    data: req.body
  });
});

// sync to postgreSQL
sequelize.sync({ alter: true })
  .then(() => console.log('PostgreSQL synced all models'))
  .catch(err => console.error('Sync failed:', err));
  
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


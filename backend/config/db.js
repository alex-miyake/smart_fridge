/**
 * @file db.js
 * @description Establishes a PostgreSQL database connection using Sequelize ORM.
 * 
 * Loads environment variables for database credentials from the .env file and
 * exports a configured Sequelize instance to be used throughout the application.
 * 
 * This script does not sync models itself; syncing is handled in server.js.
 * 
 * @requires dotenv Loads environment variables.
 * @requires sequelize Sequelize ORM constructor.
 * 
 * @exports sequelize Sequelize instance for executing queries and syncing models.
 */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fridge_inventory', 'fridge_user', 'strong_secure_pw_!2024', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
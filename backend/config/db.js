/**
 * @file db.js
 * @description Establishes a PostgreSQL database connection using Sequelize ORM.
 * 
 * Loads environment variables for database credentials from the .env file and
 * exports a configured Sequelize instance to be used throughout the application.
 * Database is hosted in a db container, not locally on my machine
 * 
 * This script does not sync models itself; syncing is handled in server.js.
 * 
 * @requires dotenv Loads environment variables.
 * @requires sequelize Sequelize ORM constructor.
 * 
 * @exports sequelize Sequelize instance for executing queries and syncing models.
*/

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
    logging: false,
  }
);
module.exports = sequelize;
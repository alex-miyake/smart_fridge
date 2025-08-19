/**
 * @file Central file for all model definitions, so each model gets a Sequelize instance passed in. 
 */

const app = require('../app');
const sequelize = require('../config/db');
require('dotenv').config();
const { DataTypes } = require('sequelize'); // Potential issue?

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

const ready = (async () => {
  try {
    console.log('Authenticating DB...');
    await sequelize.authenticate();
    console.log('Syncing DB...');
    // sync (force in test env)
    await sequelize.sync({ force: process.env.NODE_ENV === 'test' });
    console.log('DB is ready');
    return true;
  } catch (err) {
    console.error('Failed to initialize DB in index.js:', err);
    throw err;
  }
})();

//function initModels(sequelize) {
  //  (add other model factories later)
const createUser = require('./User');
const createFridge = require('./Fridge');

  // define models on sequelize instance
const User = createUser(sequelize, DataTypes);
const Fridge = createFridge(sequelize, DataTypes);

  // associations
User.hasMany(Fridge, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Fridge.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// Export everything tests/other entrypoints may need
module.exports = { app, ready, sequelize, User, Fridge };
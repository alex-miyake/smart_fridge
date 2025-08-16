/** 
 * @file schema for fridge items.
 *  
 * Defined as factory functions.
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

module.exports = (sequelize, DataTypes) => {
  const Fridge = sequelize.define('Fridge', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    defaultValue: 1,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});
  return Fridge;
};
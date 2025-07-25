/*
Schema for fridge contents.

Could expand this to cupboard as well - for dried foods and seasonings.

*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

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

Fridge.belongsTo(User, { foreignKey: { allowNull: false } });

module.exports = Fridge;
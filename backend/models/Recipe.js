/*
Schema for suggested recipes based on fridge contents.

Need to change format to factory function like in fridge and users.
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Recipe = sequelize.define('Recipe', {
  name: { type: DataTypes.STRING, allowNull: false },
  ingredients: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  instructions: { type: DataTypes.TEXT, allowNull: false },
  sourceURL: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true,});

module.exports = Recipe;
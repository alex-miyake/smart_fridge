// models/mealPost.js
/*
Schema for a user's meal post/entry.
This could represent a meal they cooked, consumed, or planned.
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Recipe = require('./Recipe');

const MealPost = sequelize.define('MealPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ingredientsUsed: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  image: {
    type: DataTypes.BLOB, // CHECK
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Associations
MealPost.belongsTo(User, { foreignKey: { allowNull: false } });
MealPost.belongsTo(Recipe, { foreignKey: { allowNull: true } });

module.exports = MealPost;
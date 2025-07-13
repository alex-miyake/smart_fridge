// models/mealPost.js
/*
Schema for a user's meal post/entry.
This could represent a meal they cooked, consumed, or planned.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // references the User model
    required: true,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe', // references the recipe model (optional, if it's an improvised meal)
    required: false, 
  },
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    required: false, // like strava extra desciption optional
    trim: true,
  },
  ingredientsUsed: [
    { // array of ingredients used in this specific meal post
      name: { type: String, required: true, trim: true },
      quantity: { type: Number, default: 1 },
      unit: { type: String, trim: true }, // e.g., 'g', 'ml', 'pcs', 'cup'
    }
  ],
  image: {
    type: String, // url to an image of the meal, for sharing purposes
    required: false,
  },
}, { timestamps: true }); // adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('MealPost', mealPostSchema);
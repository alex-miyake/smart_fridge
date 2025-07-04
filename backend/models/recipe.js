/*
Schema for suggested recipes based on fridge contents.

I'm assuming suggestions will be made using a GPT model so am putting sourceURL as a string. 
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String }], 
  instructions: { type: String, required: true },
  sourceUrl: { type: String }, // if pulled from an API
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
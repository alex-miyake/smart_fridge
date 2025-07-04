/*

Schema for fridge contents.

Could expand this to cupboard as well - for dried foods and seasonings.

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fridgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  unit: { type: String }, // e.g., grams, pieces
  expiryDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Fridge', fridgeSchema);
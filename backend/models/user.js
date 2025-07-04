/* 
Schema for each user with basic fields 

(Can add extra fields).
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  mealStreak: {
    count: { type: Number, default: 0 },
    lastPosted: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
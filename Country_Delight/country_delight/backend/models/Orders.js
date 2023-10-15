const mongoose = require('mongoose');

// Define the user schema
const oderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const User = mongoose.model('Order', oderSchema);
module.exports = User;
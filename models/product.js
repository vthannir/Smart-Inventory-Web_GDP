const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'Smith'
  }, 
  description: {
    type: String,
    required: false,
    default: 'Enter the description...'
  },
  quantity: {
    type: Number,
    required: true,
    default: 5
  },
  prize: {
    type: Number,
    required: true,
    default: 70
  }
})
module.exports = mongoose.model('Product', ProductSchema)

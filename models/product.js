const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'Enter the product name...'
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

//Similar to creating a table in SQL
module.exports = mongoose.model('Product', ProductSchema)

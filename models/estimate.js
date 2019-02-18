

const mongoose = require('mongoose')  

var Schema = mongoose.Schema

const EstimateSchema = new mongoose.Schema({
    
    
        _id: { type: Number, required: true },
        name: {
          type: String,
          required: true,
          default: 'name/description'
        },
       
    materials: {
      type: Array,
      required: false,
      default: [
        {
          product: 'Iphone',
          unitcost: 65,
         
        },
        {
          product: 'Samsung',
          unitcost: 55,
        
        },
        {
          product: 'Micromax',
          unitcost: 65,
         
        }
      ]
    },
   

    numberOfUsers: {
      type: Number,
      required: false,
      default: 2
    },
   
   
   
    
   module.exports = mongoose.model('Estimate', EstimateSchema)
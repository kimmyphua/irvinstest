
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    
  },
  image: {
    type: String,
   
  },
  tags: [{
     type: String
    }]

});

module.exports = mongoose.model('Item', itemSchema)
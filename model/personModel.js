const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], 
    minlength: [3, 'Au moins 3 caracteres']  
  },
  age: {
    type: Number,
    min: [18, 'age>=18'],  
    default: 18  
  },
  favoriteFoods: {
    type: [String],  
    default: [] 
  },
  createdAt: {
    type: Date,
    default: Date.now  
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

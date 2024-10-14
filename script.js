require('dotenv').config(); 

const mongoose = require('mongoose');
const Person = require('./model/personModel'); 

async function run() {
  try {
    // connection a la bd mongodb avec  atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    

    //Queries

   
    const newPerson = new Person({
      name: 'Birane',          
      age: 30,                   
      favoriteFoods: ['Sushi', 'Pizza']  
    });
    const arrayOfPeople = [
        { name: 'Lamine', age: 25, favoriteFoods: ['Burgers', 'Salad'] },
        { name: 'Nini', age: 32, favoriteFoods: ['Sushi', 'Pasta'] },
        { name: 'Samba', age: 32, favoriteFoods: ['Sushi', 'Pasta'] },
        { name: 'Mariama', age: 40, favoriteFoods: ['Pizza', 'Steak'] }
      ];
       // create
       const savedPerson = await newPerson.save(); 
      // creating many person 
      const createdPeople = await Person.create(arrayOfPeople);
      //   find a person
      const people = await Person.find({ name: 'Birane' });
      //  find one person by a field 
      const person = await Person.findOne({ favoriteFoods: 'Burgers' });
      //  find a person by id it will be only one becase id are unique
      const person2 = await Person.findById('670d7ae2b4522f7551368174');
      // update the document
      const person3 = await Person.findById('670d7ae2b4522f7551368174');
      //update an array field
      person3.favoriteFoods.push('hamburger');
      // update with  restriction
      const person4 = await Person.findOneAndUpdate(
        { name: 'Birane' }, 
        { age: 20 }, 
        { new: true } 
      );
      //find the person by id delete it
      const removedPerson = await Person.findByIdAndDelete('670d7ae2b4522f7551368174');
      //delete may document with a certain field
      const result = await Person.deleteMany({ name: 'Samba' });
      //find search norrrowing
      const people5 = await Person.find({ favoriteFoods: 'Pasta' })
      .sort({ name: 1 }) 
      .limit(2) 
      .select('-age') 
      .exec(); 

    //verifications
    console.log('Person saved successfully:', savedPerson);
    console.log('People created successfully:', createdPeople);
    console.log('People found by name:', people);
    console.log('Person found by favorite food:', person);
    console.log('Person found by ID:', person2);
    console.log('Updated person:', person3);
    console.log('Updated person:', person4);
    console.log('Removed person:', removedPerson);
    console.log('Delete operation result:', result);
    console.log('Found people who like burritos:', people5);

  } catch (err) {
    console.error('Error connecting or saving person:', err);
  } finally {
    await mongoose.connection.close();
  }
}

run();

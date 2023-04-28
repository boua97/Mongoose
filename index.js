const mongoose = require('mongoose');
require('dotenv').config();

// connect to MongoDB Atlas using the URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("success connect")) // If connection is successful, log a message
    .catch((e) => console.log(e.message)); // If there's an error, log the error message

// create a person schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 0 },
    favoriteFoods: [String]
});

// create a person model from the person schema
const Person = mongoose.model('Person', personSchema);

// create and save a new person
const newPerson = new Person({
    name: 'John',
    age: 30,
    favoriteFoods: ['pizza', 'pasta']
});

newPerson.save().then(() => console.log("save"))
    .catch((e) => console.log(e.message));

    // create many people using model.create()
const arrayOfPeople = [
    { name: 'Mary', age: 25, favoriteFoods: ['burritos', 'tacos'] },
    { name: 'Bob', age: 40, favoriteFoods: ['steak', 'salad'] }
  ];
  
Person.create(arrayOfPeople)
.then((data) => console.log("created",data))
.catch((e) => console.log(e.message));


// // find all people with a given name using model.find()
Person.find({ name: 'Mary' })
.then((data) => console.log("finded",data))
.catch((e) => console.log(e.message));

// // find one person with a given food in their favoriteFoods using model.findOne()
Person.findOne({ favoriteFoods: 'pizza' })
.then((data) => console.log("finded",data))
.catch((e) => console.log(e.message));



// // find one person by _id using model.findById()
Person.findById('643d387e99f7da01df6df173')
.then((data) => console.log("finded",data))
.catch((e) => console.log(e.message));

// // find a person by name and update their age using model.findOneAndUpdate()
Person.findOneAndUpdate({ name: 'John' }, { age: 20 }, { new: true })
.then((data) => console.log("finded by name and updated",data))
.catch((e) => console.log(e.message));

// delete one person by _id using model.findByIdAndRemove()
Person.findByIdAndRemove('643d37a4daa3c382c8be08ba')
.then((data) => console.log("removed",data))
.catch((e) => console.log(e.message));

// delete many people by name using model.deleteMany()
Person.deleteMany({ name: 'Mary' })
.then((data) => console.log("many people removed by name",data))
.catch((e) => console.log(e.message));
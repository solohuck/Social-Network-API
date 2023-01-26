const mongoose = require('mongoose');
const User = require('../models/User'); // import User model
const userData = require('./userData'); // import user data

mongoose.connect('mongodb://localhost/socialDB', { useNewUrlParser: true }); // connect to your database

const users = Object.values(userData); // convert user data to an array of user objects

for (let i = 0; i < users.length; i++) {
    User.findOne({ username: users[i].username }) // check if a user with the same username already exists
      .then((existingUser) => {
        if (!existingUser) { // if no existing user is found
          const newUser = new User(users[i]); // create a new user document
          newUser.save(); // save the user document to the database
        }
      })
      .catch((err) => console.log(err));
  }
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique 
      unique: true,
      required: true,
      // trimmed
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique
      unique: true,
      // must match a vaild email adress (look into mongoose's matching validation)
    },
    // Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Array of _id values referencing the User model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',  
        },
    ],
  },
  { 
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

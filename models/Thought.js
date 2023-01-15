const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // must be 1 and 280 characters 
    },
    createdAt: {
      type: Date,
      default: Date.now(), // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ // these are like replies 
      {
        // Array of nested documents created with the reactionSchema
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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // must be between 1 and 280 characters 
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now(), 
      // Use a getter method to format the timestamp on query
      getters: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: // these are like replies. Array of nested documents created with the reactionSchema
    [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
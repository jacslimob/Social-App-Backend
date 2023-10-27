const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const format_date = (date) => {
  const options = { timeZone: 'UTC', year: '2-digit', month: 'long', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}
// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // Must be between 1 and 280 characters
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: format_date
    },
    username: {
      // This is the user that created this thought
      type: String,
      required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);



thoughtSchema
// This needs to return length of the reaction array field
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

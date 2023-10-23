const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      // Took directly from mini project
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      // 280 max characters
      max_Length: 280
    },
    username: {
        //This probably needs to reference the user
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      //use a getter method to format the timestamp
      getter: true
    },
    id: false,
  }
);

module.exports = reactionSchema;

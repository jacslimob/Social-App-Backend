const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validation: (value) => {
        return validator.isEmail(value);
      }
    },
    thoughts: [
      {
        //Array of _id values referencing the Thought model
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    ],
    friends: [
      {
        //Array of _id values referencing the User model (self-reference)
        type: Schema.Types.ObjectId,
        ref: 'User'
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
//friendCount(virtual) that retrieves the length of the user's friends array
// userSchema.virtual('friendCount').get(function () {
//   // length of the users's friends
//   if (this.friends.length < 1){
//     return 0
//   }
//   return this.friends.length
// });
//create model
const User = model('user', userSchema);

module.exports = User;

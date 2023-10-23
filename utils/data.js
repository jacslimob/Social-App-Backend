// May not seed data
const usernames = [
  'Pias',
  'Evanthegreat',
  'AlmightyBruce',
  'Eternal',
  'Hamish'
];

const thoughts = [
  'Having a great day today',
  'Have you ever wondered what is going on?',
  'Another thought',
  'Winter is coming',
  'Why can\'t cars fly' 
]

const reaction = [
  'cool',
  'Truer words have never been spoken',
  'agreed',
  'Only possitive responses',
  'reaction'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random thought that we can add to username object.
const getRandomThought = (t) => {
  const results = [];
  for (let i = 0; i < t; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      reaction: getRandomArrItem(reaction), 
      
    });
  }
  return results;
};

// // Create the reactions that will be added to each thought
// const getThoughtReactions = (int) => {
//   if (int === 1) {
//     return getRandomArrItem(reaction);
//   }
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: getRandomArrItem(reaction),
//       username: getRandomUsername(),
//     });
//   }
//   return results;
// };

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThought };

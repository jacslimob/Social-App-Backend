// May not seed data
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thought');
    }

// Nothing changed below here yet
  // array to hold usernames
  const username = [];
  const thoughts = getRandomThought(5);
  // Loop through 5 times add to username array
  for (let i = 0; i < 5; i++) {
    // create users
    const name = getRandomUsername();
    const email = `${name}@gmail.com`
    

    username.push({
      name,
      email
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(username);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(username);
  console.table(thoughts);
  console.info('Jacob seeding complete! 🌱');
  process.exit(0);
});

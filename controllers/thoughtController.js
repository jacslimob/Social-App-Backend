const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // route for creating a thought
  async createThought(req, res) {
    try {
      const userId = req.params.userId; 
      // Retrieve the user's username based on their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: user.username,
      });
      
      await User.updateOne(
        { _id: userId },
        { $addToSet: { thoughts: thought._id } }
      );
  
      return res.status(201).json('Created the thought!');
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { videos: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted but no user found'
        })
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message:'No User. Thought updated.'})
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add reaction to thought
  async addThoughtReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const userId = req.params.userId; 
      // Retrieve the user's username based on their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // Create a new reaction with the user's username
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: user.username, // Set the reaction's username
      };
  
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: reaction } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this Id!' });
      }
  
      res.json({message: 'Reaction created'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // removing a reaction from a thought
  async removeThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(400).json({ message: 'No thought with this id!' });
      }

      res.json({message: 'Reaction deleted'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
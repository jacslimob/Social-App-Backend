// thought routes
const router = require('express').Router();
// all variables need to be changed
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts); 

// /api/thoughts/:userId
router.route('/:userId')
  .post(createThought); 

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought) 
  .put(updateThought) 
  .delete(deleteThought); 

// /api/thoughts/:thoughtId/reaction/:userId
router.route('/:thoughtId/reaction/:userId').post(addThoughtReaction);

// /api/thought/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(removeThoughtReaction);

module.exports = router;

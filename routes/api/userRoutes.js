// user routes
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser); 

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser) 
  .put(updateUser) 
  .delete(deleteUser); 

// /api/users/:userId/friend/:friendId
router
  .route('/:userId/friend/:friendId')
  .post(addFriend); 

// api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId')
  .delete(removeFriend); 

module.exports = router;

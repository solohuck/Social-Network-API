const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// Routing for /api/users endpoint
router.route('/')
  .get(getUsers) // handle GET requests to retrieve all users
  .post(postUser); // handle POST requests to create a new user

// Routing for /api/users/:id endpoint
router.route('/:id')
  .get(getSingleUser) // handle GET requests to retrieve a single user by its id
  .put(updateUser) // handle PUT requests to update a user by its id
  .delete(deleteUser); // handle DELETE requests to remove a user by its id


module.exports = router;

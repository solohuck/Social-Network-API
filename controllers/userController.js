const User = require('../models/User');

module.exports = {
    // GET all users
    getUsers(req, res) {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    // GET a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a new user:
    postUser(req, res) {
    const newUser = new User(req.body);
    newUser.save()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // DELETE to remove user by its _id
    deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
    User.findById(req.params.userId)
        .then((user) => {
            user.friends.push(req.params.friendId);
            return user.save();
        })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // DELETE to remove a friend from a user's friend list
    removeFriend(req, res) {
    User.findById(req.params.userId)
        .then((user) => {
            user.friends.pull(req.params.friendId);
            return user.save();
        })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

};
  

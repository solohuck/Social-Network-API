const Thought = require('../models/Thought');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by its _id
    getSingleThought(req, res) {
        Thought.findById(req.params.id)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    postThought(req, res) {
        const newThought = new Thought(req.body);
        newThought.save()
            .then((thought) => {
                User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } })
                    .then(() => res.json(thought))
                    .catch((err) => res.status(500).json(err))
            })
            .catch((err) => res.status(500).json(err))
    },
    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
        },
    // POST to create a reaction stored in a single thought's reactions array field
    add(req, res) {
        Thought.findById(req.params.userId)
            .then((thought) => {
                thought.reaction.push(req.params.reactionId);
                return thought.save();
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
        },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
};
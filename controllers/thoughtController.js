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
                User.findByIdAndUpdate(req.body.id, { $push: { thoughts: thought._id } })
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
    addReaction(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
                thought.reactions.push(req.body);
                return thought.save();
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
        },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction(req, res) {
        Thought.findById(req.params.thoughtId) // findById method to find the thought that contains the reaction
            .then((thought) => {
                const index = thought.reactions.indexOf(req.params.reactionId); // indexOf method to find the index of the reaction in the reactions array of the thought.
                if (index > -1) {
                    thought.reactions.splice(index, 1); // Uses the splice method to remove the reaction from the array, and then it saves the updated thought.
                }
                return thought.save(); // The return statement will pass the thought with the removed reaction to the client.
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
        },
};

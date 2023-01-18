const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// the endpoints are defined here.

// This route handles GET requests to retrieve all thoughts.
// This route handles POST requests to create a new thought.
router.route('/')
  .get(getThoughts) 
  .post(postThought); 

  // This route handles GET requests to retrieve a single thought by its id.
  // This route handles PUT requests to update a thought by its id.
  // This route handles DELETE requests to remove a thought by its id.
router.route('/:id')
  .get(getSingleThought) 
  .put(updateThought) 
  .delete(deleteThought); 

// This route handles POST requests to create a reaction for a thought.
// This route handles DELETE requests to remove a reaction by its reactionId.
router.route('/:thoughtId/reactions')
  .post(addReaction) 
  .delete(removeReaction); 


module.exports = router;
const router = express.Router();
const userRoutes = require('./models/User');
const thoughtRoutes = require('./models/Thought');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
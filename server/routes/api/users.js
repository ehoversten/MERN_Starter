const router = require('express').Router();
const { getUsers, getUserDetail } = require('../../controllers/userController');
const { register, login, logout, isLoggedIn } = require('../../controllers/authController');
const auth = require('../../middleware/auth.js');

// -- Route --> '/api/users/' 
// @desc     Fetch ALL USERS
// @route    GET /api/users
// @access   Public
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});

// -- Route --> '/api/users/' 
// -- Have to Pick a Style ??? -- //
router.get('/all', auth, getUsers);
// router.route('/all').get(getUsers);
// router.get('/:id', getUserDetail);
router.post('/register', register);
router.post('/login', login);
router.get('/loggedIn', isLoggedIn);
router.get('/logout', logout);
router.route('/:id').get(getUserDetail);


module.exports = router;
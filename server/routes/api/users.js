const router = require('express').Router();
const { getUsers, getUserDetail } = require('../../controllers/userController');
const { register, login, logout, isLoggedIn } = require('../../controllers/authController');
// const User = require('../../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// -- Route --> '/api/users/' 
// @desc     Fetch ALL USERS
// @route    GET /api/users
// @access   Public
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});

// -- Route --> '/api/users/' 
// -- Have to Pick a Style ??? -- //
router.get('/all', getUsers);
// router.route('/all').get(getUsers);
// router.get('/:id', getUserDetail);
router.route('/:id').get(getUserDetail);
router.post('/register', register);
router.post('/login', login);
router.get('/loggedIn', isLoggedIn);
router.get('/logout', logout);


module.exports = router;
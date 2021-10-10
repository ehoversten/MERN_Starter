const User = require('../models/userModel');

// @desc     Fetch ALL USERS
// @route    GET /api/users/all
// @access   Public
const getUsers = async (req, res) => {

    console.log(req.user);

    try {
        // -- TESTING -- //
        // throw new Error("Ooops something went sideways ...");
        let allUsers = await User.find({});
        // console.log(allUsers);
        res.json(allUsers);
    } catch(error) {
        console.error(error.errorMessage);
        res.status(500).json(error);
    }
}

// @desc     Fetch Single USER 
// @route    GET /api/users/:id
// @access   Public
const getUserDetail = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        console.log(user)
        res.status(200).json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}


// @desc     Fetch Logged In USER 
// @route    GET /api/users/detail
// @access   Private
const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.user;
        let user = await User.findById(id).select('-password');
        console.log(user);
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}



module.exports = {
    getUsers, 
    getUserDetail
}
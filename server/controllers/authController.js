const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc     CREATE NEW USER
// @route    POST /api/users/register
// @access   Public
const register = async (req, res) => {
    try {
        const { first, last, username, email, password, confirm } = req.body;

        // -- Input Validation -- //
        if(!first || !last || !username || !email || !password || !confirm) {
            return res
                    .status(400)
                    .json({ errorMessage: "Please Enter All Fields!"});
        }

        if(password.length < 6) {
            return res  
                    .status(400)
                    .json({ errorMessage: "Password must be at least 6 characters!"});
        }

        if(password !== confirm) {
            return res  
                    .status(400)
                    .json({ errorMessage: "Passwords must match!"});
        }

        let existingUser = await User.findOne({ email });
        // -- For Testing -- //
        // console.log(existingUser);

        if(existingUser) {
            res.status(400)
                .json({ errorMessage: "Email Already Exists"})
        }

        // -- Encrypt Password -- //
        // let salt =  await bcrypt.genSalt();
        // let passHash = await bcrypt.hash(password, salt);

        let newUser = new User({
            firstName: first,
            lastName: last,
            username: username,
            email: email,
            password: password
        });

        // -- For Testing -- //
        // console.log(newUser);
        // console.log('*********');

        // -- Save Record -- //
        const savedUser = await User.create(newUser);
        // console.log(savedUser);

        // -- Create Token -- //
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // -- For Testing -- //
        console.log(`Token: ${token}`);

        // -- Send Token -- //
        res.status(201).cookie("token", token, { httpOnly: true }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send("ERROR ...");
    }
}

// @desc     LOGIN USER
// @route    POST /api/users/login
// @access   Public
const login = async (req, res) => {
    console.log('Hit Login Route...');
    try {
        const { email, password } = req.body;

        // -- Input Validation -- //
        if(!email || !password) {
            return res
                    .status(400)
                    .json({ errorMessage: "Please Enter All Fields!"});
        }

        // -- Check User -- //
        let foundUser = await User.findOne({ email });
        // let foundUser = await User.findOne({ email }).select("+password");
        console.log(`Found User: ${foundUser}`);
        
        if(!foundUser) {
            return res.status(401).json({ errorMessage: "Not Authorized"});
        }
        // -- Verify Password -- //
        const verified = await bcrypt.compare(password, foundUser.password);
        console.log(`Verified: ${verified}`);
        if(!verified) {
            return res.status(401).json({ errorMessage: "Not Authorized"});
        }
            
        // -- Verify Password -- //
        // const isMatch = await foundUser.matchPassword(password);
        // console.log(isMatch);
        // if(!isMatch) {
        //      return res.status(401).json({ errorMessage: "Not Authorized"});
        // }

        // -- Sign Token -- //
        const token = jwt.sign({
            user: foundUser._id
        }, process.env.JWT_SECRET);

        // -- For Testing -- //
        console.log(`Token: ${token}`);
        console.log("Login Successful");

        // sendToken(foundUser, res);

        // -- Send Token -- //
        // res.status(200).cookie("token", token, { httpOnly: true }).send();
        res.status(200).cookie("token", token, { httpOnly: true }).json(foundUser).send();
    } catch(err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Not Authorized"});
    }
}

// @desc     Check if USER is LOGGED IN
// @route    GET /api/users/loggedIn
// @access   Public
const isLoggedIn = (req, res) => {
    console.log('Checking if Logged In ...');
    try {
        const token = req.cookies.token;
        console.log(`Token: ${token}`);

        if(!token) {
            res.json(false);
        } else {
            jwt.verify(token, process.env.JWT_SECRET);
            res.send(true);
        }
    } catch(err) {
        console.error(err);
        res.json(false);
    } 
}

// @desc     LOG CURRENT USER OUT
// @route    GET /api/users/logout
// @access   Public
const logout = (req, res) => {
    try {
        console.log('Hit Logout Route...');
        // -- Reset JWT Cookie -- //
        console.log("Logout Successful");
        res
            .cookie('token', "", { httpOnly: true, expires: new Date(0) })
            .send("Logged Out");
    } catch(error) {
        console.log(error);
        res.json(error);
    }
}

// @desc     VERIFY TOKEN
// @route    None
// @access   Private
const sendToken = (user, res) => {
    const token = user.getSignedToken();
    // --> ADD TOKEN TO COOKIES ??? 
    res.status(200).json({ success: true, token: token});
}

module.exports = {
    register, 
    login, 
    isLoggedIn,
    logout
}
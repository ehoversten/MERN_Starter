const router = require('express').Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// -- Route --> '/api/users/' 
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});

// -- Route --> '/api/users/all' 
router.get('/all', async (req, res) => {
    let allUsers = await User.find({});
    console.log(allUsers);

    res.json(allUsers);
});

// -- Route --> '/api/users/register' 
router.post('/register', async (req, res) => {
    // -- TESTING -- //
    // console.log('Hit Register Route...');
    // console.log(req.body);

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
        let salt =  await bcrypt.genSalt();
        let passHash = await bcrypt.hash(password, salt);

        let newUser = new User({
            firstName: first,
            lastName: last,
            username: username,
            email: email,
            password: passHash
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
});

// -- Route --> '/api/users/login' 
router.post('/login', async (req, res) => {
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

        // -- Sign Token -- //
        const token = jwt.sign({
            user: foundUser._id
        }, process.env.JWT_SECRET);

        // -- For Testing -- //
        console.log(`Token: ${token}`);
        console.log("Login Successful");

        // -- Send Token -- //
        res.status(200).cookie("token", token, { httpOnly: true }).send();
    } catch(err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Not Authorized"});
    }
});

// -- Route --> '/api/users/logout' 
router.get('/logout', (req, res) => {
    console.log('Hit Logout Route...');
    // -- Reset JWT Cookie -- //
    console.log("Logout Successful");
    res
        .cookie('token', "", { httpOnly: true, expires: new Date(0) })
        .send("Logged Out");
});


module.exports = router;
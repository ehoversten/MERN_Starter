const router = require('express').Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route --> '/api/users' 
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});


router.get('/all', async (req, res) => {
    let allUsers = await User.find({});
    console.log(allUsers);

    res.json(allUsers);
});

router.post('/register', async (req, res) => {
    console.log(req.body);

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

        let existingUser = User.findOne({ email });
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
        console.log(newUser);
        console.log('*********');

        // -- Save Record -- //
        const savedUser = await User.create(newUser);
        console.log(savedUser);

        // -- Create Token -- //
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // -- For Testing -- //
        console.log(token);

        // -- Send Token -- //
        res.status(201).cookie("token", token, { httpOnly: true }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send("ERROR ...");
    }

});

router.post('/login', async (req, res) => {
    console.log(req.body);

    let loginObj = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const { email, password } = req.body;

        // -- Input Validation -- //
        if(!email || !password) {
            return res
                    .status(400)
                    .json({ errorMessage: "Please Enter All Fields!"});
        }

        // -- Compare Passwords -- //
        // if(password.length > 6) {
        //     return res  
        //             .status(400)
        //             .json({ errorMessage: "Password must be at least 6 characters!"});
        // }

        let foundUser = await User.findOne({ email });

        console.log(foundUser);
    } catch(err) {
        console.error(err);
    }

    res.json(loginObj);
});


module.exports = router;
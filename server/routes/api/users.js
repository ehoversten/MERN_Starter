const router = require('express').Router();
const User = require('../../models/userModel');

// Route --> '/api/users' 
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});


router.get('/all', async (req, res) => {
    let allUsers = await User.find();
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

        if(password.length > 6) {
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
        console.log(existingUser);
        if(existingUser) {
            res.status(400)
                .json({ errorMessage: "Email Already Exists"})
        }

        // -- Encrypt Password before Saving to Database -- //
        let hashPass = password;

        let newUser = {
            firstName: first,
            lastName: last,
            username: username,
            email: email,
            password: hashPass
        }


    } catch(err) {
        console.error(err);
        res.status(500).send("ERROR ...");
    }


    console.log(newUser);

    // Create User in DB
    // try {
    //     await User.create(newUser);
    //     console.log("new user created ...")
    //     res.json(newUser);
    // } catch(err) {
    //     console.error(err);
    // }

    res.json(newUser);
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
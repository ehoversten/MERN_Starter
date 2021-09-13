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

    let newUser = {
        firstName: req.body.first,
        lastName: req.body.last,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    console.log(newUser);

    // Create User in DB
    try {
        await User.create(newUser);
        console.log("new user created ...")
        res.json(newUser);
    } catch(err) {
        console.error(err);
    }
});

router.post('/login', (req, res) => {
    console.log(req.body);

    let loginObj = {
        email: req.body.email,
        password: req.body.password
    }

    res.json(loginObj);
});


module.exports = router;
const router = require('express').Router();


// Route --> '/api/users' 
router.get('/', (req, res) => {
    res.send("Hit Users Route");
});


module.exports = router;
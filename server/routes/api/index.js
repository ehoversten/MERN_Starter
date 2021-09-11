const router = require('express').Router();
const userRoutes = require('./users');

// Route --> '/api' 
router.use("/users", userRoutes);

module.exports = router;
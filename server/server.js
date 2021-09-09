require('dotenv').config();
const express = require('express');
const path = require("path");
const logger = require('morgan');
const PORT = process.env.PORT || 5001;

const app = express();

/* === Middleware === */
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* === Routing === */
app.get('/', (req, res) => {
    res.send("Testing Route");
})


app.listen(PORT, () => {
    console.log(`Server is in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
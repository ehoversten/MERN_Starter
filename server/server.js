require('dotenv').config();
const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const errorHandler = require('./utils/errorResponse');
const routes = require('./routes');
const connectDB = require('./config/connection');

/* === Database Connection === */
connectDB();

const app = express();

/* === Middleware === */
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Error Handler Should be last piece of Middleware
// app.use(errorHandler);

/* === Routing === */
app.use(routes);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
// });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const connect = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/auth_template', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true
        // useFindAndModify: false,
      });

      console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;

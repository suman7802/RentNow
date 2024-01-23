require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.URI;

async function connectDB() {
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDB;

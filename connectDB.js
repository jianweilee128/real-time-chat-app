const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const URI = process.env.MONGODB_URI || process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB connection successful!");
      });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

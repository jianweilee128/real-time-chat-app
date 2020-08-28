const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Configuration and connection to MongoDB
const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DB_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI || DB, {
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

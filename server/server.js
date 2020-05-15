const mongoose = require("mongoose");
const app = require("./index");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

async () => {
  try {
    await mongoose
      .connect(DB, {
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

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

import bodyParser = require("body-parser");
import dotenv = require("dotenv");
import express = require("express");
import helmet = require("helmet");
import mongoose = require("mongoose");
import path = require("path");

dotenv.config();

mongoose.Promise = global.Promise;
(async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.NODE_ENV === "production" ? process.env.MONGO_URI : process.env.MONGO_DEV_URI}`,
      { useNewUrlParser: true },
    );
    console.log("Successfully connected to database");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
})();

const app: express.Application = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "dist")));

const port: number = Number(process.env.SERVER_PORT) || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

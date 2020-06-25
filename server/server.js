const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/user");

const app = express();

dotenv.config();

Mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else console.log("database connected successfully");
  }
);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const productRoutes = require('./routes/product');
app.use('/api', productRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listening on port", 3000);
  }
});

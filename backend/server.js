const express = require("express");
const core = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const user = require("./routes/user.js");
const app = express();
const { readdirSync } = require("fs");

//dotenv
dotenv.config();

// middleware
app.use(core());
app.use(express.json());

//routes
readdirSync("./routes").map((f) => app.use("/", require("./routes/" + f)));

//database
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database Connected");
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

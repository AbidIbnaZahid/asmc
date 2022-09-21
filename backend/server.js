const express = require("express");
const core = require("cors");
const user = require("./routers/user.js");
const app = express();

// middleware
app.use(core());
app.use(express.json());

//routes
app.use("/", user);
app.listen(8000, () => {
  console.log("Running on port 8000");
});

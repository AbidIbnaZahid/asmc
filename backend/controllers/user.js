const {
  validatedEmail,
  validatedText,
  validatedUserName,
} = require("../helpers/validation.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token.js");

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    bYear,
    bMonth,
    bDay,
  } = req.body;

  // Email Validation
  if (!validatedEmail(email)) {
    res.status(400).json({ massage: "Invalid email address" });
  }

  //Check if user exits or not
  let check = await User.findOne({ email });

  if (check) {
    res
      .status(400)
      .json({ massage: "Email address already exits, try another email" });
  }

  //first name length check
  if (!validatedText(first_name, 3, 30)) {
    res.status(400).json({ massage: "First name must be 3 to 30 character" });
  }

  //last name length check
  if (!validatedText(last_name, 3, 30)) {
    res.status(400).json({ massage: "Last name must be 3 to 30 character" });
  }

  //password length check
  if (!validatedText(password, 6, 30)) {
    res.status(400).json({ massage: "Password must be at least 6 character" });
  }

  //hash password
  const cryptPassword = await bcrypt.hash(password, 1);

  //username generate
  let tempUserName = first_name + last_name;
  let newUserName = await validatedUserName(tempUserName);

  const user = await new User({
    first_name,
    last_name,
    username: newUserName,
    email,
    password: cryptPassword,
    gender,
    bYear,
    bMonth,
    bDay,
  }).save();
  //token generate
  let token = generateToken(user._id, "30m");
  console.log(token);
  res.json(user);
};

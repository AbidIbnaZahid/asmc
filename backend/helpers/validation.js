const User = require("../models/User.js");

exports.validatedEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

exports.validatedText = (text, min, max) => {
  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
};

exports.validatedUserName = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username += +(+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};

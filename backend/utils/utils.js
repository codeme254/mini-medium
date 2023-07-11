const bcrypt = require("bcrypt");
const User = require("../models/User");
const Article = require("../models/Article");
const usernameExists = async (username) => {
  const user = await User.findOne({ username: username });
  if (user) return true;
  return false;
};

const emailAddressExists = async (emailAddress) => {
  const result = await User.findOne({ emailAddress: emailAddress });
  if (result) return true;
  return false;
};

const userExists = async (username) => {
  const result = await User.findOne({ username: username });
  if (result) return true;
  return false;
};

const hashPassword = (real_password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(real_password, saltRounds);
  return hashedPassword;
};

const articleExists = async (article_id) => {
  const article = await Article.findById({ article_id });
  if (article) return true;
  return false;
};

module.exports = {
  usernameExists,
  emailAddressExists,
  userExists,
  hashPassword,
  articleExists,
};

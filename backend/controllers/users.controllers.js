const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const jwtSalt = process.env.JWT_SALT;

const {
  usernameExists,
  emailAddressExists,
  userExists,
  hashPassword,
} = require("../utils/utils");
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(204).json(users);
      }
      return res.status(201).json(users);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getUser: async (req, res) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `No user with the username ${username}` });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  createUser: async (req, res) => {
    const username = req.body.username;
    const emailAddress = req.body.emailAddress;
    if (await usernameExists(username))
      return res.status(409).json({ message: "Username already taken" });

    if (await emailAddressExists(emailAddress))
      return res.status(409).json({ message: "Email address already taken" });

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      emailAddress: req.body.emailAddress,
      password: hashPassword(req.body.password),
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  updateUser: async (req, res) => {
    const username = req.params.username;
    if (await userExists(username)) {
      try {
        const user = await User.findOne({ username: username });
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.profilePicture)
          user.profilePicture = req.body.profilePicture;
        if (req.body.newUserName) {
          if (await usernameExists(req.body.newUserName)) {
            return res
              .status(409)
              .json({ message: `Updated gone wrong, username already taken` });
          }
          user.username = req.body.newUserName;
        }
        if (req.body.emailAddress) {
          if (await emailAddressExists(req.body.newEmailAddress)) {
            return res.status(409).json({
              message: `Update gone wrong, email address already taken`,
            });
          }
          user.emailAddress = req.body.newEmailAddress;
        }
        await user.save();
        res.status(200).json({
          message: `Information about ${username} updated successfully`,
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: `No such user as ${username}` });
    }
  },

  deleteUser: async (req, res) => {
    const username = req.params.username;
    if (await userExists(username)) {
      await User.deleteOne({ username });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: `No such user with username ${username}` });
    }
  },

  loginUser: async (req, res) => {
    const { emailAddress, password } = req.body;

    if (await emailAddressExists(emailAddress)) {
      try {
        const user = await User.findOne({ emailAddress });
        const savedPassword = user.password;
        const dataResponse = {
          emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          username: user.username,
        };
        if (bcrypt.compareSync(password, savedPassword)) {
          jwt.sign(dataResponse, jwtSalt, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(dataResponse);
          });
        } else {
          res.status(400).json({ message: "Wrong password" });
        }
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    } else {
      res.status(404).json({
        message: `There is no user with email address ${emailAddress}`,
      });
    }
  },
};

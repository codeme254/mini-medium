const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} = require("../controllers/users.controllers");

// get all users
router.get("/", getAllUsers);

// Get a user profile using the email address
router.post("/profile", getProfile);

// Get a user
router.get("/:username", getUser);

// Create a user
router.post("/", createUser);

// Update user information
router.patch("/:username", updateUser);

// delete user
router.delete("/:username", deleteUser);

// login a user
router.post("/auth/login", loginUser);
module.exports = router;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 300,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.methods.follow = function (user_id) {
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id);
  }
  return this.save();
};

UserSchema.methods.addFollower = function (new_follower) {
  this.followers.push(new_follower);
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);

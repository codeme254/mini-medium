const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;

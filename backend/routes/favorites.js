const express = require("express");
const router = express.Router();
const {
  createFavorite,
  getFavorites,
  getSpecificFavorite,
  deleteFavorite,
} = require("../controllers/favorites.controller");

router.post("/:username", createFavorite);

router.get("/:username", getFavorites);

router.get("/:username/:article_id", getSpecificFavorite);

router.delete("/:username/:article_id", deleteFavorite);

module.exports = router;

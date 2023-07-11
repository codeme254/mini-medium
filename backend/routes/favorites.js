const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const { articleExists } = require("../utils/utils");
const Article = require("../models/Article");

router.post("/:username", async (req, res) => {
  const { article_id } = req.body;
  const article = await Article.findById(article_id);

  if (article) {
    const newFavorite = new Favorite({
      blogId: article_id,
      username: req.params.username,
    });

    try {
      await newFavorite.save();
      res.status(200).json({ message: "Successfully added to favorites" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const favorites = await Favorite.find({ username });
    const allFavorites = [];
    for (let i = 0; i < favorites.length; i++) {
      const blogId = favorites[i].blogId;
      const article = await Article.findById(blogId);
      if (article) allFavorites.push(article);
    }
    res.send(allFavorites);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:username/:article_id", async (req, res) => {
  const { username, article_id } = req.params;
  try {
    const favorite = await Favorite.findOne({ username, blogId: article_id });
    if (favorite) {
      const realArticle = await Article.findById(favorite.blogId);
      if (realArticle) {
        res.status(200).json(realArticle);
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:username/:article_id", async (req, res) => {
  const { username, article_id } = req.params;

  try {
    const deletedFavorite = await Favorite.findOneAndDelete({
      username,
      blogId: article_id,
    });

    if (deletedFavorite) {
      res.status(200).json({ message: "Favorite deleted successfully" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

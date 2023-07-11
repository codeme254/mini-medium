const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { emailAddressExists } = require("../utils/utils");

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    if (articles.length === 0) {
      return res.status(204).json(articles);
    } else {
      return res.status(200).json(articles);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { title, description, article_image, text, author } = req.body;
    if (await emailAddressExists(author)) {
      const article = new Article({
        title,
        description,
        article_image,
        text,
        author,
      });
      const newArticle = await article.save();
      newArticle.save();
      return res.status(200).json(newArticle);
    } else {
      res
        .status(404)
        .json({
          message: "Not Allowed, email address of author not recognized",
        });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// TODO: populate the comments before sending the article
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id });
  if (!article) return res.status(404).json({ message: "Article not found" });
  try {
    // update title, description, image, text
    const { title, description, image, text } = req.body;
    if (title) {
      article.title = title;
    }
    if (description) {
      article.description = description;
    }
    if (image) {
      article.image = image;
    }
    if (text) {
      article.text = text;
    }
    await article.save();
    return res.status(200).json({ message: "Article updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    await Article.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;

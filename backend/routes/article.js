const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  createArticle,
  getSpecificArticle,
  updateArticle,
  deleteArticle,
  getAllArticlesForSpecificUser,
} = require("../controllers/article.controller");

router.get("/", getAllArticles);

router.post("/", createArticle);

router.post("/:username", getAllArticlesForSpecificUser);

// TODO: populate the comments before sending the article
router.get("/:id", getSpecificArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

module.exports = router;

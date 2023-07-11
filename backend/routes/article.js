const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  createArticle,
  getSpecificArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

router.get("/", getAllArticles);

router.post("/", createArticle);

// TODO: populate the comments before sending the article
router.get("/:id", getSpecificArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

module.exports = router;

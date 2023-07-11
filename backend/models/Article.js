const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  article_image: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  claps: {
    type: Number,
    default: () => 1,
  },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: () => Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: () => Date.now(),
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
      },
      dateCreated: {
        type: Date,
        default: () => Date.now(),
      },
    },
  ],
});

ArticleSchema.methods.clap = function () {
  this.claps++;
  return this.save();
};
ArticleSchema.methods.comment = function (c) {
  this.comments.push(c);
  return this.save();
};
ArticleSchema.methods.addAuthor = function (email_address) {
  this.author = email_address;
  return this.save();
};
ArticleSchema.methods.getUserArticle = function (_id) {
  Article.find({ author: _id }).then((article) => {
    return article;
  });
};

module.exports = mongoose.model("Article", ArticleSchema);

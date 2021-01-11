const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/wikiDB";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

let Articles = mongoose.model("article", articleSchema);

async function getAllArticles() {
  return await Articles.find();
}

async function createArticle(title, content) {
  let article = new Articles({ title: title, content: content });
  return await article.save().catch((err) => "");
}

async function deleteArticle(id) {
  return await Articles.findByIdAndDelete(id).catch((err) => "");
}

async function deleteAllArticles() {
  return await Articles.deleteMany().catch((err) => "");
}

async function getArticle(id) {
  return await Articles.findById(id);
}

async function updateArticle(id, content) {
  return await Articles.findByIdAndUpdate(id, { content: content });
}

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
  getArticle,
  deleteAllArticles,
  updateArticle,
};

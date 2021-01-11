const mongoose = require("mongoose");
const url =
  "mongodb+srv://admin-pikl:Test123@todolist.q30kh.mongodb.net/blogpostDB";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let postShema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please give a title "],
  },
  post: {
    type: String,
    required: [true, "please give a content"],
  },
});

const Post = mongoose.model("Post", postShema);

async function addPost(newPost) {
  let post = new Post({ title: newPost.title, post: newPost.post });
  await post.save();
}

async function getAllPost() {
  return await Post.find().then((data) => {
    return data;
  });
}

async function getPost(title) {
  return await Post.findOne({ title: title }).then((data) => {
    return data;
  });
}

module.exports = {
  addPost,
  getAllPost,
  getPost,
};

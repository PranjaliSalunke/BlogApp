const { readDB, writeDB } = require("../utils/dbUtils");
const postsPath = "./data/posts.json";

exports.getPosts = (req, res) => {
  const posts = readDB(postsPath);
  res.json(
    posts.map(({ id, title, author, excerpt, comments }) => ({
      id,
      title,
      author,
      excerpt,
      comments,
    }))
  );
};

exports.getPostById = (req, res) => {
  const { id } = req.params;
  const posts = readDB(postsPath);
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.addComment = (req, res) => {
  const { id } = req.params;
  const { username, comment } = req.body;
  const posts = readDB(postsPath);
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push({ username, comment });
  writeDB(postsPath, posts);
  res.json({ message: "Comment added", post });
};

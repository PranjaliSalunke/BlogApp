const { readDB, writeDB } = require("../utils/dbUtils");
const postsPath = "./data/posts.json";

// Create a post (admin only)
exports.createPost = (req, res) => {
  const { title, author, content, excerpt } = req.body;
  if (!title || !author || !content || !excerpt) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const posts = readDB(postsPath);
  const newPost = {
    id: posts.length + 1,
    title,
    author,
    content,
    excerpt,
    comments: [],
  };
  posts.push(newPost);
  writeDB(postsPath, posts);

  res.status(201).json({ message: "Post created successfully", post: newPost });
};

// Edit a post (admin only)
exports.editPost = (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt } = req.body;

  const posts = readDB(postsPath);
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.excerpt = excerpt || post.excerpt;
  writeDB(postsPath, posts);

  res.status(200).json({ message: "Post updated successfully", post });
};

// Delete a post (admin only)
exports.deletePost = (req, res) => {
  const { id } = req.params;

  const posts = readDB(postsPath);
  const updatedPosts = posts.filter((p) => p.id !== parseInt(id));

  if (posts.length === updatedPosts.length) {
    return res.status(404).json({ message: "Post not found" });
  }

  writeDB(postsPath, updatedPosts);
  res.status(200).json({ message: "Post deleted successfully" });
};

// Delete a comment (admin only)
exports.deleteComment = (req, res) => {
  const { postId, commentIndex } = req.params;

  const posts = readDB(postsPath);
  const post = posts.find((p) => p.id === parseInt(postId));

  if (!post || !post.comments[commentIndex]) {
    return res.status(404).json({ message: "Comment not found" });
  }

  post.comments.splice(commentIndex, 1);
  writeDB(postsPath, posts);

  res.status(200).json({
    message: "Comment deleted successfully",
    post,
  });
};

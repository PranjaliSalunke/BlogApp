const express = require("express");
const {
  getPosts,
  getPostById,
  addComment,
} = require("../controllers/postController");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/:id/comments", addComment);

module.exports = router;

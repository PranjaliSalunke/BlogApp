const express = require("express");
const {
  createPost,
  editPost,
  deletePost,
  deleteComment,
} = require("../controllers/adminController");

const router = express.Router();

const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/create", checkAdmin, createPost);
router.put("/edit/:id", checkAdmin, editPost);
router.delete("/delete/:id", checkAdmin, deletePost);
router.delete(
  "/delete-comment/:postId/:commentIndex",
  checkAdmin,
  deleteComment
);

module.exports = router;

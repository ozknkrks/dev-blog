const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Tüm yazıları getir
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Belirli bir yazıyı slug ile getir
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni yazı ekle
router.post("/", async (req, res) => {
  const { title, slug, content, author, image, tags } = req.body;

  const post = new Post({ title, slug, content, author, image, tags });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

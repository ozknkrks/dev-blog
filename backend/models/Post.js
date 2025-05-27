const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: { type: String }, // isteğe bağlı
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
});

module.exports = mongoose.model("Post", postSchema);

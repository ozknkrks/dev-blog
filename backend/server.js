const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projects");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);

// Test endpoint (opsiyonel)
app.get("/", (req, res) => {
  res.send("✅ DevBlog backend çalışıyor.");
});

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});

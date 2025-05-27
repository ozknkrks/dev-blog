const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Tüm projeleri getir
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Belirli bir projeyi slug ile getir
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Proje bulunamadı" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni proje ekle
router.post("/", async (req, res) => {
    const { title, description, type, image } = req.body;
  
    const project = new Project({ title, description, type, image });
  
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;

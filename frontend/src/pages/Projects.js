import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Projeler alınamadı:", err));
  }, []);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚀 Projelerim</h1>

      <div className="flex gap-4 mb-6">
        {["all", "web", "mobile"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 border rounded ${
              filter === type ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            {type === "all" ? "Tümü" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link
              to={`/projects/${project._id}`}
              className="flex gap-4 border rounded-lg p-4 shadow bg-white hover:shadow-lg transition min-h-[180px]"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 text-gray-500 flex items-center justify-center rounded-md text-sm">
                  Görsel yok
                </div>
              )}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
                <span className="inline-block mt-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded w-fit">
                  {project.type}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

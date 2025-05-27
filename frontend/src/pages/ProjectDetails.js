import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Proje getirme hatası:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Yükleniyor...</div>;
  if (!project) return <div className="p-6">Proje bulunamadı.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-2">{project.description}</p>
      <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">{project.type}</span>
    </div>
  );
}

export default ProjectDetail;

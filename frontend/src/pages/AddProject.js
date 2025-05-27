import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "web",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects", form);
      toast.success("Proje başarıyla eklendi!");
      navigate("/projects");
    } catch (err) {
      toast.error("Proje eklenirken hata oluştu.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Yeni Proje Ekle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Proje başlığı"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Proje açıklaması"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="web">Web</option>
          <option value="mobile">Mobil</option>
        </select>
        <input
          name="image"
          placeholder="Görsel URL'si"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded">
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default AddProject;

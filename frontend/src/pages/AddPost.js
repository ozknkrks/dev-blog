import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddPost() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    author: "",
    content: "",
    tags: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const handleTagKeyDown = (e) => {
    if (e.key === "," && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    // Eğer başlık değiştiriliyorsa slug'ı üret
    if (name === "title") {
      newForm.slug = value
        .toLowerCase()
        .trim()
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ç/g, "c")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u")
        .replace(/ğ/g, "g")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/posts", {
        ...form,
        tags,
      });

      toast.success("✅ Yazı başarıyla eklendi!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      console.error("Hata detayları:", err.response?.data || err.message);

      toast.error("❌ Yazı eklenirken hata oluştu!", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>📝 Yeni Yazı Ekle</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='image'
          placeholder="Kapak görseli URL'si (isteğe bağlı)"
          value={form.image}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <input
          type='text'
          name='title'
          placeholder='Başlık'
          value={form.title}
          onChange={handleChange}
          className='border p-2 rounded'
          required
        />

        <input
          type='text'
          name='author'
          placeholder='Yazar'
          value={form.author}
          onChange={handleChange}
          className='border p-2 rounded'
        />
        <label className='font-medium'>İçerik</label>
        <ReactQuill
          theme='snow'
          value={form.content}
          onChange={(value) => setForm({ ...form, content: value })}
          className='h-[300px] '
        />
        {/* <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        /> */}
        <label className='font-medium mt-8 mb-0'>Etiketler</label>
        <input
          type='text'
          placeholder='Etiket ekle ve virgül ile ayır'
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className='border p-2 rounded '
        />
        <div className='flex flex-wrap gap-2 mt-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300'
              onClick={() => handleTagRemove(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Kaydet
        </button>
      </form>
      <ToastContainer />;
    </div>
  );
}

export default AddPost;

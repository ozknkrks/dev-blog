import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${slug}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri çekme hatası:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen text-gray-600 text-lg'>
        Yükleniyor...
      </div>
    );
  }

  if (!post) {
    return <div className='p-6 md:ml-64'>Yazı bulunamadı</div>;
  }

  return (
    <div className='p-6 md:ml-64 max-w-3xl'>
      {/* Kapak görseli */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className='rounded-xl mb-4 max-h-[400px] object-cover w-full'
        />
      )}

      {/* Başlık */}
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>{post.title}</h1>

      {/* Tarih ve yazar */}
      <p className='text-sm text-gray-500 mb-4'>
        {new Date(post.createdAt).toLocaleDateString()} – {post.author}
      </p>

      {/* İçerik */}
      <div
        className='prose prose-blue max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Etiketler */}
      <div className='mt-4'>
        <p className='font-medium mb-2'>Etiketler:</p>
        <div className='flex gap-2 flex-wrap'>
          {post.tags &&
            post.tags
              .filter((t) => t.trim() !== "")
              .map((tag, index) => (
                <span
                  key={index}
                  className='inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-2'
                >
                  #{tag}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

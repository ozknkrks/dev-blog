import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>📚 Blog Yazıları</h1>

      <div className='flex flex-col gap-6'>
        {posts.length === 0 ? (
          <p>Yazı bulunamadı.</p>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/post/${post.slug}`}
                className='flex border border-gray-200 hover:shadow-md rounded-xl bg-white transition-all duration-200 overflow-hidden h-36'
              >
                {post.image && (
                  <div className='w-40 h-full'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}

                <div className='flex flex-col justify-center p-4 w-full'>
                  <h2 className='text-lg font-semibold text-gray-900 truncate'>
                    {post.title}
                  </h2>
                  <p className='text-sm text-gray-500'>
                    {new Date(post.createdAt).toLocaleDateString()} —{" "}
                    {post.author}
                  </p>
                  <div
                    className='text-sm text-gray-600 line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

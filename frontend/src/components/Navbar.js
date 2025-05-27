import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle =
    "hover:text-yellow-300 transition font-semibold tracking-wide";

  return (
    <>
      {/* Mobil üst navbar */}
      <div className="md:hidden bg-[#121212] text-white px-4 py-3 shadow flex justify-between items-center fixed w-full top-0 z-50 border-b border-yellow-400">
        <Link to="/" className="text-xl font-bold text-yellow-400 tracking-widest">
          ⚔️ ANIMEBLOG
        </Link>
        <button onClick={() => setOpen(!open)} className="text-2xl text-yellow-300">
          ☰
        </button>
      </div>

      {/* Mobil açılır menü */}
      <div
        className={`md:hidden bg-[#1f1f1f] text-white shadow transition-all duration-300 overflow-hidden ${
          open ? "max-h-60" : "max-h-0"
        } mt-14 border-b border-yellow-400`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4">
          <li><Link to="/" onClick={() => setOpen(false)} className={linkStyle}>🏠 Anasayfa</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)} className={linkStyle}>🧙‍♂️ Hakkımda</Link></li>
          <li><Link to="/projects" onClick={() => setOpen(false)} className={linkStyle}>📂 Projeler</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)} className={linkStyle}>📫 İletişim</Link></li>
          <li><Link to="/add" onClick={() => setOpen(false)} className="text-sm text-yellow-300 font-semibold hover:underline">➕ Yeni Yazı</Link></li>
        </ul>
      </div>

      {/* Sidebar (masaüstü) */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-[#121212] text-white border-r border-yellow-400 shadow px-6 py-6 z-40">
        <h1 className="text-2xl font-bold text-yellow-400 mb-8 tracking-widest">
          ⚔️ ANIMEBLOG
        </h1>
        <ul className="flex flex-col gap-4 text-sm">
          <li><Link to="/" className={linkStyle}>🏠 Anasayfa</Link></li>
          <li><Link to="/about" className={linkStyle}>🧙‍♂️ Hakkımda</Link></li>
          <li><Link to="/projects" className={linkStyle}>📂 Projeler</Link></li>
          <li><Link to="/contact" className={linkStyle}>📫 İletişim</Link></li>
          <li><Link to="/add" className="text-yellow-300 font-semibold hover:underline">➕ Yeni Yazı</Link></li>
        </ul>
      </aside>
    </>
  );
}

export default Navbar;

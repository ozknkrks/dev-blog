

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import AddPost from "./pages/AddPost";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";

function App() {
  return (
    
    <Router>
      <div className="md:flex">
        <Navbar />
        <main className="flex-1 p-6  md:pt-6 md:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/add-project" element={<AddProject />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

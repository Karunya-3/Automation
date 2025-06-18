import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar'; 
import Home from './components/Home'; 
import Projects from './components/Projects'; 
import AddProject from './components/AddProject'; 
import ProjectDetails from './components/ProjectDetails'; 
import Templates from './components/Templates'; 
import Login from './components/Login';
import Signup from './components/SignUp'; 
import NoMatch from './components/NoMatch'; 

// Main App Component
export default function App() {
  const [projects, setProjects] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  function addProject(newProject) {
    setProjects((prev) => [newProject, ...prev]);
  }
  // App.js (update inside the component)
const deleteProject = (id) => {
  const updatedProjects = projects.filter((project) => project.id !== id);
  setProjects(updatedProjects);
};




  return (
    <Router>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#ffffff' }}>
        <NavBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
  path="/projects"
  element={<Projects projects={projects} deleteProject={deleteProject} />}
/>

            <Route path="/projects/add" element={<AddProject addProject={addProject} />} />
            <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <footer className="text-center py-3" style={{ backgroundColor: '#3F72AF', color: '#E0E7FF' }}>
          © {new Date().getFullYear()} NSTL - DRDO. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Projects({ projects }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="container my-5" style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: '20px' }}>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h1 className="fw-bold mb-0">Projects</h1>
        <button className="btn btn-primary" onClick={() => navigate('/projects/add')}>
          + Add Project
        </button>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted">No projects added yet. Click "Add Project" to create one.</p>
      ) : (
        <div className="row g-4">
          {projects.map((project, idx) => (
            <div key={project.id} className="col-sm-6 col-md-4">
              <div
                className="card h-100 shadow-sm"
                style={{
                  cursor: 'pointer',
                  borderColor: '#3F72AF',
                  backgroundColor: '#f8f9fa',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: hoveredCard === idx ? '0 8px 20px rgba(0,0,0,0.2)' : undefined,
                }}
                onClick={() => navigate(`/projects/${project.id}`)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ color: '#3F72AF' }}>
                    {project.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted fst-italic">{project.version}</h6>
                  <p className="card-text flex-grow-1">
                    {project.description.length > 100 ? project.description.slice(0, 100) + '...' : project.description}
                  </p>
                  <p className="mb-1">
                    <strong>State:</strong> <span style={{ color: '#3F72AF' }}>{project.state}</span>
                  </p>
                  {project.documents.length > 0 && (
                    <p className="mb-0">
                      <strong>Documents:</strong> {project.documents.map((doc) => doc.name).join(', ')}
                    </p>
                  )}
                  <p className="mb-0">
                    <strong>Criticality Level:</strong> {project.criticality}</p>
                  <p className="mb-0">
                    <strong>Project Type:</strong> {project.projectType}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;

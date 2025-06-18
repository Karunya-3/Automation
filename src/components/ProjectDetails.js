import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDetails({ projects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  const handleGoToTemplates = () => {
    // Pass project data through navigation state
    navigate('/Templates', {
      state: {
        projectData: {
          projectName: project.name,
          description: project.description,
          version: project.version,
          projectState: project.state,
          type: project.projectType,
          criticality: project.criticality
        }
      }
    });
  };

  if (!project) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">Project not found</h2>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate('/projects')}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div
      className="container my-5"
      style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 20 }}
    >
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/projects')}>
        &larr; Back to Projects
      </button>
      <h1 className="fw-bold mb-3" style={{ color: '#3F72AF' }}>
        {project.name}
      </h1>
      <p>
        <strong>Description:</strong>
        <br />
        {project.description || 'No description provided'}
      </p>
      <p>
        <strong>Version:</strong> {project.version || 'N/A'}
      </p>
      <p>
        <strong>State:</strong>{' '}
        <span style={{ color: '#3F72AF' }}>{project.state}</span>
      </p>
      <p className="mt-3">
        <strong>Project Type:</strong> {project.projectType || 'N/A'}
      </p>
      <p className="mt-3">
        <strong>Criticality Level:</strong> {project.criticality || 'N/A'}
      </p>

      <div className="mt-3">
        <strong>Documents:</strong>
        {project.documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <ul className="list-group mt-2" style={{ maxWidth: '400px' }}>
            {project.documents.map((doc, idx) => (
              <li key={idx} className="list-group-item">
                {doc.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={handleGoToTemplates}
        >
          Go-to Templates
        </button>
      </div>
    </div>
  );
}

export default ProjectDetails;
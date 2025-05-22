import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProject({ addProject }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('');
  const [state, setState] = useState('Planning');
  const [projectType, setProjectType] = useState('');
  const [documents, setDocuments] = useState([]);
  const [criticality, setCriticality] = useState(null);

  function handleFileChange(e) {
    setDocuments(Array.from(e.target.files));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert('Project name is required');
      return;
    }
    if (!criticality) {
      alert('Please select a criticality level');
      return;
    }
    if (!projectType) {
      alert('Please select a project type');
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      version: version.trim(),
      state,
      projectType,
      criticality,
      documents,
    };

    addProject(newProject);
    navigate('/projects');
  }

  return (
    <div
      className="container my-5"
      style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 20 }}
    >
      <h1 className="fw-bold mb-4" style={{ color: '#3F72AF' }}>
        Add Project
      </h1>
      <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label fw-semibold text-dark">
            Project Name<span className="text-danger">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter project name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label fw-semibold text-dark">
            Description
          </label>
          <textarea
            id="projectDescription"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectVersion" className="form-label fw-semibold text-dark">
            Version
          </label>
          <input
            id="projectVersion"
            type="text"
            className="form-control"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="Enter version"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectState" className="form-label fw-semibold text-dark">
            Project State
          </label>
          <select
            id="projectState"
            className="form-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option>System Requirements</option>
            <option>Software Planning like Dev, Configuraion, Certification, Quality Assurance</option>
            <option>Software Requirements</option>
            <option>Software Design</option>
            <option>Software Development</option>
            <option>Software Integration</option>
            <option>Hardware-Software Integration</option>
            <option>System Integration</option>
            <option>User Acceptance</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Type" className="form-label fw-semibold text-dark">
            Types
          </label>
          <select
            id="Type"
            className="form-select"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select type</option>
            <option>Full in Phase IV&V</option>
            <option>Partial in Phase IV&V</option>
            <option>End in Phase IV&V</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Criticality Level:</label>
          <div>
            {[1, 2, 3, 4, 5].map((level) => (
              <div className="form-check form-check-inline" key={level}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="criticality"
                  id={`criticality${level}`}
                  value={level}
                  checked={criticality === level}
                  onChange={() => setCriticality(level)}
                />
                <label className="form-check-label" htmlFor={`criticality${level}`}>
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="uploadDocuments" className="form-label fw-semibold text-dark">
            Upload Documents
          </label>
          <input
            id="uploadDocuments"
            type="file"
            multiple
            className="form-control"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
          {documents.length > 0 && (
            <ul className="list-group mt-2" style={{ maxHeight: 120, overflowY: 'auto' }}>
              {documents.map((doc, idx) => (
                <li key={idx} className="list-group-item py-1">
                  {doc.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddProject;

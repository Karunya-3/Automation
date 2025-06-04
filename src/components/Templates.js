import React, { useState } from "react";
import mammoth from "mammoth";

export default function TemplatesSection() {
  const predefinedTemplates = [
    { id: 1, name: "Template A", content: "1. Introduction\n1.1 Background\n2. Methodology\n2.1 Data Collection" },
    { id: 2, name: "Template B", content: "1. Title\n2. Author\n3. Abstract\n3.1 Keywords" },
    { id: 3, name: "Template C", content: "1. Header\n2. Body\n2.1 Main Content\n3. Footer" },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadedTemplateText, setUploadedTemplateText] = useState("");
  const [uploadedDocumentText, setUploadedDocumentText] = useState("");
  const [report, setReport] = useState("");

  const handleSelectTemplate = (e) => {
    const template = predefinedTemplates.find(
      (t) => t.id === parseInt(e.target.value)
    );
    setSelectedTemplate(template);
    setUploadedTemplateText("");
    setReport("");
  };

  const extractTextFromDocx = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        mammoth
          .extractRawText({ arrayBuffer })
          .then((result) => resolve(result.value))
          .catch((err) => reject(err));
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUploadTemplate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".docx")) {
      try {
        const text = await extractTextFromDocx(file);
        setUploadedTemplateText(text);
        setSelectedTemplate(null);
        setReport("");
      } catch (err) {
        alert("Failed to extract text from Word document.");
      }
    } else if (file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedTemplateText(evt.target.result);
        setSelectedTemplate(null);
        setReport("");
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .txt or .docx file");
    }
  };

  const handleUploadDocument = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".docx")) {
      try {
        const text = await extractTextFromDocx(file);
        setUploadedDocumentText(text);
        setReport("");
      } catch (err) {
        alert("Failed to extract text from Word document.");
      }
    } else if (file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedDocumentText(evt.target.result);
        setReport("");
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .txt or .docx file");
    }
  };

 const generateReport = () => {
    const templateText = selectedTemplate
      ? selectedTemplate.content
      : uploadedTemplateText;

    if (!templateText) {
      alert("Please select or upload a template.");
      return;
    }
    if (!uploadedDocumentText) {
      alert("Please upload a document to check.");
      return;
    }

    // Enhanced regex to match numbered headings and subheadings with hierarchy
    const headingRegex = /^(\d+(?:\.\d+)*)\s+(.+)$/gm;

    // Extract headings with hierarchy information
    const extractHeadings = (text) => {
      const headings = [];
      let matches;
      
      while ((matches = headingRegex.exec(text)) !== null) {
        const [fullMatch, numbering, title] = matches;
        const level = (numbering.match(/\./g) || []).length + 1;
        
        headings.push({
          original: fullMatch.trim(),
          numbering: numbering.trim(),
          title: title.trim(),
          normalized: title.trim().toLowerCase(),
          level: level
        });
      }
      
      return headings;
    };

    const templateHeadings = extractHeadings(templateText);
    const docHeadings = extractHeadings(uploadedDocumentText);

    // Create a map of template headings for quick lookup
    const templateHeadingMap = new Map();
    templateHeadings.forEach(heading => {
      templateHeadingMap.set(heading.normalized, heading);
    });

    // Create a map of document headings for quick lookup
    const docHeadingMap = new Map();
    docHeadings.forEach(heading => {
      docHeadingMap.set(heading.normalized, heading);
    });

    // Find matching and missing headings
    const matchingHeadings = templateHeadings.filter(h => docHeadingMap.has(h.normalized));
    const missingInDoc = templateHeadings.filter(h => !docHeadingMap.has(h.normalized));
    const extraInDoc = docHeadings.filter(h => !templateHeadingMap.has(h.normalized));

    // Generate hierarchical display for template headings
    const renderTemplateHeadings = (headings) => {
      return (
        <ul className="list-group" style={{ listStyleType: 'none' }}>
          {headings.map((heading, index) => {
            const isMatch = docHeadingMap.has(heading.normalized);
            const docHeading = isMatch ? docHeadingMap.get(heading.normalized) : null;
            
            return (
              <li 
                key={`template-${index}`}
                className={`list-group-item ${isMatch ? 'list-group-item-success' : 'list-group-item-danger'}`}
                style={{ 
                  marginLeft: `${(heading.level - 1) * 20}px`,
                  fontWeight: heading.level === 1 ? 'bold' : 'normal',
                  borderLeft: isMatch ? '4px solid #28a745' : '4px solid #dc3545'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    {heading.numbering} {heading.title}
                  </span>
                  {isMatch ? 
                    <span className="badge bg-success">✅ Match</span> : 
                    <span className="badge bg-danger">❌ Missing</span>
                  }
                </div>
                {isMatch && docHeading.numbering !== heading.numbering && (
                  <div className="text-muted small mt-1">
                    Document numbering: {docHeading.numbering}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    // Generate hierarchical display for document headings (only showing matches)
    const renderDocumentHeadings = () => {
      // Only show headings that exist in the template
      const matchedDocHeadings = docHeadings.filter(h => templateHeadingMap.has(h.normalized));
      
      return (
        <ul className="list-group" style={{ listStyleType: 'none' }}>
          {matchedDocHeadings.map((heading, index) => {
            const templateHeading = templateHeadingMap.get(heading.normalized);
            
            return (
              <li 
                key={`doc-${index}`}
                className="list-group-item list-group-item-success"
                style={{ 
                  marginLeft: `${(heading.level - 1) * 20}px`,
                  fontWeight: heading.level === 1 ? 'bold' : 'normal',
                  borderLeft: '4px solid #28a745'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    {heading.numbering} {heading.title}
                  </span>
                  <span className="badge bg-success">✅ In Template</span>
                </div>
                {templateHeading.numbering !== heading.numbering && (
                  <div className="text-muted small mt-1">
                    Template numbering: {templateHeading.numbering}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    // Generate report JSX with improved summary
    setReport(
      <div className="comparison-report">
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center mb-3">Template Structure ({templateHeadings.length} headings)</h4>
            {renderTemplateHeadings(templateHeadings)}
          </div>
          <div className="col-md-6">
            <h4 className="text-center mb-3">Document Matches ({matchingHeadings.length} matched)</h4>
            {renderDocumentHeadings()}
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-light rounded">
          <h5 className="mb-3">Compliance Summary</h5>
          
          <div className="row">
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Matched Headings</div>
                <div className="card-body">
                  <h4 className="card-title">{matchingHeadings.length}</h4>
                  <p className="card-text">{(matchingHeadings.length/templateHeadings.length*100).toFixed(1)}% coverage</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-header">Missing Headings</div>
                <div className="card-body">
                  <h4 className="card-title">{missingInDoc.length}</h4>
                  <p className="card-text">Required by template</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-header">Extra Headings</div>
                <div className="card-body">
                  <h4 className="card-title">{extraInDoc.length}</h4>
                  <p className="card-text">Not in template</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="progress mt-3" style={{height: "25px"}}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{width: `${(matchingHeadings.length/templateHeadings.length)*100}%`}}
              aria-valuenow={(matchingHeadings.length/templateHeadings.length)*100}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Matched ({matchingHeadings.length})
            </div>
            <div 
              className="progress-bar bg-danger" 
              role="progressbar" 
              style={{width: `${(missingInDoc.length/templateHeadings.length)*100}%`}}
              aria-valuenow={(missingInDoc.length/templateHeadings.length)*100}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Missing ({missingInDoc.length})
            </div>
          </div>
          
          {missingInDoc.length > 0 && (
            <div className="mt-3">
              <h6>Missing Headings:</h6>
              <ul className="list-group">
                {missingInDoc.map((heading, index) => (
                  <li key={`missing-${index}`} className="list-group-item list-group-item-danger">
                    {heading.numbering} {heading.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {extraInDoc.length > 0 && (
            <div className="mt-3">
              <h6>Extra Headings in Document:</h6>
              <ul className="list-group">
                {extraInDoc.map((heading, index) => (
                  <li key={`extra-${index}`} className="list-group-item list-group-item-warning">
                    {heading.numbering} {heading.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4 text-center">Document Structure Validator</h2>

      <div className="mb-3">
        <label htmlFor="templateSelect" className="form-label">
          Choose a template:
        </label>
        <select
          id="templateSelect"
          className="form-select"
          onChange={handleSelectTemplate}
          value={selectedTemplate?.id || ""}
        >
          <option value="">-- Select Template --</option>
          {predefinedTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="uploadTemplate" className="form-label">
          Or upload a template (text or Word document):
        </label>
        <input
          className="form-control"
          type="file"
          id="uploadTemplate"
          accept=".txt,.docx"
          onChange={handleUploadTemplate}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="uploadDocument" className="form-label">
          Upload document to check (text or Word document):
        </label>
        <input
          className="form-control"
          type="file"
          id="uploadDocument"
          accept=".txt,.docx"
          onChange={handleUploadDocument}
        />
      </div>

      <div className="d-grid mb-4">
        <button className="btn btn-primary" onClick={generateReport}>
          Compare Document Structure
        </button>
      </div>

      {(uploadedTemplateText || selectedTemplate?.content) && (
        <div className="mb-4 p-3 bg-light border rounded">
          <h5>Template Content Preview</h5>
          <div style={{ maxHeight: "200px", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {selectedTemplate?.content || uploadedTemplateText}
          </div>
        </div>
      )}

      {uploadedDocumentText && (
        <div className="mb-4 p-3 bg-light border rounded">
          <h5>Document Content Preview</h5>
          <div style={{ maxHeight: "200px", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {uploadedDocumentText}
          </div>
        </div>
      )}

      {report && (
        <div className="mt-4 p-3 border rounded">
          <h4 className="text-center mb-3">Structure Comparison Report</h4>
          {report}
        </div>
      )}
    </div>
  );
}
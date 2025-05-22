import React, { useState } from "react";
import mammoth from "mammoth";

export default function TemplatesSection() {
  const predefinedTemplates = [
    { id: 1, name: "Template A", content: "Name, Date, Signature" },
    { id: 2, name: "Template B", content: "Title, Author, Summary" },
    { id: 3, name: "Template C", content: "Header, Footer, Page Number" },
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

  // Utility function to extract text from .docx using mammoth
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

  // Regex to match numbered headings, e.g. "1.", "2.1", "3.4.5 ", at line start
  const headingRegex = /^\d+(\.\d+)*\s.*$/gm;

  // Extract headings from template text
  const templateHeadingsRaw = templateText.match(headingRegex) || [];
  // Normalize: trim and lowercase
  const templateHeadings = templateHeadingsRaw.map(h => h.trim().toLowerCase());

  // Extract headings from uploaded document text
  const docHeadingsRaw = uploadedDocumentText.match(headingRegex) || [];
  const docHeadings = docHeadingsRaw.map(h => h.trim().toLowerCase());

  // Find missing headings in document
  const missingHeadings = templateHeadings.filter(
    heading => !docHeadings.includes(heading)
  );

  if (missingHeadings.length === 0) {
    setReport(
      `All template headings found in the document. ✅ (${templateHeadings.length}/${templateHeadings.length})`
    );
  } else {
    setReport(
      `Missing headings in document: \n${missingHeadings.join("\n")} \n❌\n` +
      `Matched ${templateHeadings.length - missingHeadings.length} out of ${templateHeadings.length} headings.`
    );
  }
};



  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Templates Section</h2>

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

      <div className="mb-4">
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
        {uploadedTemplateText && (
          <div
            className="mt-2 p-3 bg-light border rounded"
            style={{ maxHeight: 120, overflowY: "auto", whiteSpace: "pre-wrap" }}
          >
            <strong>Uploaded Template Content:</strong>
            <br />
            {uploadedTemplateText}
          </div>
        )}
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
        {uploadedDocumentText && (
          <div
            className="mt-2 p-3 bg-light border rounded"
            style={{ maxHeight: 120, overflowY: "auto", whiteSpace: "pre-wrap" }}
          >
            <strong>Uploaded Document Content:</strong>
            <br />
            {uploadedDocumentText}
          </div>
        )}
      </div>

      <div className="d-grid">
        <button className="btn btn-primary" onClick={generateReport}>
          Check Template Against Document
        </button>
      </div>

      {report && (
        <div
          className={`mt-4 p-3 border rounded ${
            report.includes("❌") ? "bg-danger text-white" : "bg-success text-white"
          }`}
        >
          <strong>Report:</strong>
          <p className="mb-0">{report}</p>
        </div>
      )}
    </div>
  );
}

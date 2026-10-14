"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

export default function QuillHtmlEditor({ value = "", onChange, placeholder = "Tulis isi artikel lengkap di sini..." }) {
  const [activeTab, setActiveTab] = useState("visual"); // 'visual' | 'html' | 'preview'
  const editorRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(value);
  const [quillReady, setQuillReady] = useState(false);

  // Sync internal state with external value prop
  useEffect(() => {
    if (value !== htmlContent) {
      setHtmlContent(value);
      if (quillInstanceRef.current && quillInstanceRef.current.root.innerHTML !== value) {
        quillInstanceRef.current.root.innerHTML = value;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Initialize Quill on the client
  useEffect(() => {
    let isMounted = true;

    async function initQuill() {
      if (!editorRef.current || quillInstanceRef.current) return;

      try {
        const QuillModule = await import("quill");
        const Quill = QuillModule.default || QuillModule;

        if (!isMounted || !editorRef.current) return;

        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"],
            ],
          },
        });

        quillInstanceRef.current = quill;

        // Set initial HTML
        if (value) {
          quill.root.innerHTML = value;
        }

        // Listen for changes
        quill.on("text-change", () => {
          const currentHtml = quill.root.innerHTML;
          const cleanHtml = currentHtml === "<p><br></p>" ? "" : currentHtml;
          setHtmlContent(cleanHtml);
          if (onChange) onChange(cleanHtml);
        });

        setQuillReady(true);
      } catch (err) {
        console.error("Gagal menginisialisasi Quill editor:", err);
      }
    }

    if (activeTab === "visual") {
      initQuill();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Handle HTML source textarea change
  const handleHtmlChange = (e) => {
    const newHtml = e.target.value;
    setHtmlContent(newHtml);
    if (onChange) onChange(newHtml);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = newHtml;
    }
  };

  // Switch tabs cleanly
  const switchTab = (tab) => {
    if (tab === "visual" && quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = htmlContent;
    }
    setActiveTab(tab);
  };

  // Quick HTML snippet helper
  const insertSnippet = (snippet) => {
    const updated = (htmlContent || "") + snippet;
    setHtmlContent(updated);
    if (onChange) onChange(updated);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = updated;
    }
  };

  return (
    <div className="quill-html-editor-wrapper border rounded-3 overflow-hidden bg-white shadow-sm">
      {/* Editor Navigation Bar */}
      <div className="bg-light border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className={`btn ${activeTab === "visual" ? "btn-primary active fw-bold" : "btn-outline-secondary"}`}
            onClick={() => switchTab("visual")}
          >
            <i className="fas fa-edit me-1"></i> Visual Editor (Quill)
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "html" ? "btn-primary active fw-bold" : "btn-outline-secondary"}`}
            onClick={() => switchTab("html")}
          >
            <i className="fas fa-code me-1"></i> HTML Source
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "preview" ? "btn-success active fw-bold" : "btn-outline-secondary"}`}
            onClick={() => switchTab("preview")}
          >
            <i className="fas fa-eye me-1"></i> Live Preview
          </button>
        </div>

        {/* Quick HTML Snippet Helpers (shown in HTML mode) */}
        {activeTab === "html" && (
          <div className="d-flex gap-1 flex-wrap">
            <span className="small text-muted align-self-center me-1">Sisipkan Tag:</span>
            <button type="button" className="btn btn-xs btn-outline-dark" onClick={() => insertSnippet("<h2>Subheading Baru</h2>\n")}>
              &lt;h2&gt;
            </button>
            <button type="button" className="btn btn-xs btn-outline-dark" onClick={() => insertSnippet("<h3>Sub-poin</h3>\n")}>
              &lt;h3&gt;
            </button>
            <button type="button" className="btn btn-xs btn-outline-dark" onClick={() => insertSnippet("<ul>\n  <li>Poin 1</li>\n  <li>Poin 2</li>\n</ul>\n")}>
              &lt;ul&gt;
            </button>
            <button type="button" className="btn btn-xs btn-outline-dark" onClick={() => insertSnippet("<blockquote>Kutipan penting...</blockquote>\n")}>
              &lt;quote&gt;
            </button>
          </div>
        )}

        <div className="small text-muted">
          {htmlContent ? `${htmlContent.replace(/<[^>]*>?/gm, "").split(/\s+/).filter(Boolean).length} kata` : "0 kata"}
        </div>
      </div>

      {/* Mode 1: Quill Visual Editor */}
      <div style={{ display: activeTab === "visual" ? "block" : "none" }}>
        <div ref={editorRef} style={{ minHeight: "340px", fontSize: "16px" }} />
      </div>

      {/* Mode 2: HTML Source Code */}
      {activeTab === "html" && (
        <div className="p-2">
          <textarea
            className="form-control font-monospace border-0"
            rows="16"
            style={{ fontSize: "14px", lineHeight: "1.6", resize: "vertical" }}
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Ketik atau paste kode HTML artikel Anda di sini..."
          />
        </div>
      )}

      {/* Mode 3: Live Preview */}
      {activeTab === "preview" && (
        <div className="p-4 p-md-5 bg-white" style={{ minHeight: "360px" }}>
          <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <i className="fas fa-info-circle"></i>
            <span>Ini adalah tampilan langsung bagaimana isi artikel akan terlihat oleh pengunjung website.</span>
          </div>
          {htmlContent ? (
            <div
              className="blog-details-content text-secondary"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.9",
                color: "#4a5568",
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="text-center py-5 text-muted">
              <i className="far fa-file-alt fa-3x mb-3 text-secondary opacity-50 d-block"></i>
              <p>Belum ada konten artikel. Tulis di tab <strong>Visual Editor</strong> atau <strong>HTML Source</strong> untuk melihat preview.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

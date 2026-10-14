"use client";
import React, { useState } from "react";

export default function SeoBoosterPanel({ form, onChange }) {
  const [previewMode, setPreviewMode] = useState("mobile"); // 'mobile' | 'desktop'

  // Hitung jumlah karakter dan status warna
  const titleText = form.meta_title || form.title || "";
  const titleLength = titleText.length;
  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;
  const isTitleTooLong = titleLength > 65;

  const descText = form.meta_description || form.excerpt || "";
  const descLength = descText.length;
  const isDescOptimal = descLength >= 130 && descLength <= 165;
  const isDescTooLong = descLength > 165;

  const focusKeyword = (form.keywords || "").split(",")[0]?.trim().toLowerCase();
  const rawContent = (form.content || "").replace(/<[^>]*>?/gm, "").toLowerCase();
  const wordCount = rawContent.split(/\s+/).filter(Boolean).length;

  // Cek kriteria SEO untuk skor
  const checks = [
    {
      id: "kw_title",
      label: "Kata kunci fokus ada di Judul Artikel",
      passed: Boolean(focusKeyword && titleText.toLowerCase().includes(focusKeyword)),
      weight: 20,
    },
    {
      id: "kw_desc",
      label: "Kata kunci fokus ada di Meta Description",
      passed: Boolean(focusKeyword && descText.toLowerCase().includes(focusKeyword)),
      weight: 20,
    },
    {
      id: "kw_slug",
      label: "Kata kunci fokus ada di Slug / URL",
      passed: Boolean(focusKeyword && (form.slug || "").toLowerCase().includes(focusKeyword.replace(/\s+/g, "-"))),
      weight: 15,
    },
    {
      id: "kw_content",
      label: "Kata kunci fokus muncul di isi konten artikel",
      passed: Boolean(focusKeyword && rawContent.includes(focusKeyword)),
      weight: 15,
    },
    {
      id: "len_title",
      label: "Panjang judul SEO ideal (40–65 karakter)",
      passed: isTitleOptimal,
      weight: 10,
    },
    {
      id: "len_desc",
      label: "Panjang deskripsi SEO ideal (130–165 karakter)",
      passed: isDescOptimal,
      weight: 10,
    },
    {
      id: "has_subheading",
      label: "Mengandung sub-judul (H2 / H3) untuk keterbacaan",
      passed: (form.content || "").includes("<h2") || (form.content || "").includes("<h3"),
      weight: 5,
    },
    {
      id: "word_count",
      label: "Panjang konten memadai (> 300 kata untuk ranking Google)",
      passed: wordCount >= 300,
      weight: 5,
    },
  ];

  const totalScore = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);
  const scoreBadgeClass =
    totalScore >= 80 ? "bg-success text-white" : totalScore >= 50 ? "bg-warning text-dark" : "bg-danger text-white";

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5 mt-4">
      {/* Header Panel */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
            <i className="fas fa-rocket fa-lg"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">SEO Booster & Preview Google</h5>
            <small className="text-muted">Optimalkan visibilitas artikel agar menempati peringkat teratas di Google Search</small>
          </div>
        </div>

        {/* Skor SEO Real-Time */}
        <div className="d-flex align-items-center gap-2">
          <span className="small text-muted fw-bold">Skor Optimasi SEO:</span>
          <span className={`badge px-3 py-2 fs-6 rounded-pill ${scoreBadgeClass}`}>
            <i className="fas fa-chart-line me-1"></i> {totalScore} / 100
          </span>
        </div>
      </div>

      {/* Google SERP Snippet Preview */}
      <div className="mb-4 p-3 p-md-4 rounded-3 border" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small text-muted fw-bold text-uppercase">
            <i className="fab fa-google text-danger me-1"></i> Simulasi Tampilan di Google Search
          </span>
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className={`btn btn-xs ${previewMode === "mobile" ? "btn-dark fw-bold" : "btn-outline-secondary"}`}
              onClick={() => setPreviewMode("mobile")}
            >
              <i className="fas fa-mobile-alt me-1"></i> Mobile
            </button>
            <button
              type="button"
              className={`btn btn-xs ${previewMode === "desktop" ? "btn-dark fw-bold" : "btn-outline-secondary"}`}
              onClick={() => setPreviewMode("desktop")}
            >
              <i className="fas fa-desktop me-1"></i> Desktop
            </button>
          </div>
        </div>

        {/* Google Card Simulation */}
        <div
          className="p-3 bg-white rounded-3 shadow-sm"
          style={{ maxWidth: previewMode === "mobile" ? "420px" : "680px", margin: "0 auto", border: "1px solid #e2e8f0" }}
        >
          {/* Breadcrumb line */}
          <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: "12px", color: "#202124" }}>
            <img src="/favicon.ico" alt="Favicon" style={{ width: "16px", height: "16px", borderRadius: "50%" }} onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="fw-semibold">Fasel Consulting</span>
            <span className="text-muted">› blog › {form.slug || "judul-artikel"}</span>
          </div>

          {/* Title line */}
          <h6
            className="mb-1"
            style={{
              color: "#1a0dab",
              fontSize: previewMode === "mobile" ? "17px" : "19px",
              lineHeight: "1.3",
              fontWeight: "400",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {titleText ? `${titleText} — Fasel Consulting` : "Judul Artikel yang Menarik & Mengandung Kata Kunci — Fasel Consulting"}
          </h6>

          {/* Snippet Description */}
          <p
            className="mb-0"
            style={{
              color: "#4d5156",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {descText ||
              "Deskripsi singkat artikel Anda akan muncul di sini. Tulis deskripsi persuasif antara 140-160 karakter untuk menarik klik dari pengunjung Google..."}
          </p>
        </div>
      </div>

      {/* SEO Inputs Form */}
      <div className="row g-3">
        {/* Focus Keyword */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold small">
            Kata Kunci Utama (Focus Keyword) <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="keywords"
            className="form-control"
            placeholder="Contoh: Experiential Learning Indonesia"
            value={form.keywords || ""}
            onChange={onChange}
          />
          <small className="text-muted">Kata kunci pencarian yang ingin Anda menangkan di Google.</small>
        </div>

        {/* Custom Slug */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold small">URL Slug Kustom (Permalink)</label>
          <div className="input-group">
            <span className="input-group-text small text-muted">/blog/</span>
            <input
              type="text"
              name="slug"
              className="form-control font-monospace small"
              placeholder="experiential-learning-indonesia"
              value={form.slug || ""}
              onChange={onChange}
            />
          </div>
          <small className="text-muted">Gunakan huruf kecil dan tanda hubung (-). Dibuat otomatis dari judul jika kosong.</small>
        </div>

        {/* SEO Meta Title */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label fw-bold small mb-0">Judul SEO (Meta Title untuk Google)</label>
            <span className={`small fw-bold ${isTitleOptimal ? "text-success" : isTitleTooLong ? "text-danger" : "text-warning"}`}>
              {titleLength} / 65 karakter {isTitleOptimal ? "✓ (Optimal)" : isTitleTooLong ? "⚠ (Terlalu Panjang)" : "(Disarankan 40–65)"}
            </span>
          </div>
          <input
            type="text"
            name="meta_title"
            className={`form-control ${isTitleTooLong ? "is-invalid" : isTitleOptimal ? "is-valid" : ""}`}
            placeholder="Ketik judul khusus untuk hasil pencarian Google (default: sama dengan judul artikel)"
            value={form.meta_title || ""}
            onChange={onChange}
          />
        </div>

        {/* SEO Meta Description */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label fw-bold small mb-0">Deskripsi SEO (Meta Description untuk Google)</label>
            <span className={`small fw-bold ${isDescOptimal ? "text-success" : isDescTooLong ? "text-danger" : "text-warning"}`}>
              {descLength} / 165 karakter {isDescOptimal ? "✓ (Optimal)" : isDescTooLong ? "⚠ (Terlalu Panjang)" : "(Disarankan 130–165)"}
            </span>
          </div>
          <textarea
            name="meta_description"
            className={`form-control ${isDescTooLong ? "is-invalid" : isDescOptimal ? "is-valid" : ""}`}
            rows="3"
            placeholder="Tulis ringkasan menarik yang merangkum isi artikel dan memancing orang mengklik tautan di Google..."
            value={form.meta_description || ""}
            onChange={onChange}
          />
        </div>

        {/* Canonical URL (Advanced) */}
        <div className="col-12">
          <label className="form-label fw-bold small">Canonical URL Kustom (Opsional)</label>
          <input
            type="text"
            name="canonical_url"
            className="form-control form-control-sm font-monospace"
            placeholder="https://www.faselconsulting.id/blog/..."
            value={form.canonical_url || ""}
            onChange={onChange}
          />
          <small className="text-muted">Biarkan kosong untuk menggunakan URL otomatis standar website.</small>
        </div>
      </div>

      {/* SEO Checklist & Suggestions */}
      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-bold mb-3 small text-uppercase text-muted">
          <i className="fas fa-tasks me-1"></i> Checklist Analisis SEO Real-Time
        </h6>
        <div className="row g-2">
          {checks.map((check) => (
            <div className="col-12 col-md-6" key={check.id}>
              <div
                className={`p-2 px-3 rounded-2 small d-flex align-items-center gap-2 ${
                  check.passed ? "bg-success bg-opacity-10 text-success" : "bg-light text-muted"
                }`}
              >
                <i className={`fas ${check.passed ? "fa-check-circle text-success" : "fa-circle text-secondary opacity-50"}`}></i>
                <span>{check.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

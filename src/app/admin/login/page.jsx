"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("fasel_admin_token");
      const user = localStorage.getItem("fasel_admin_user");
      if (token && user) {
        setAlreadyLoggedIn(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          localStorage.setItem("fasel_admin_token", data.token);
        }
        if (data.user) {
          localStorage.setItem("fasel_admin_user", JSON.stringify(data.user));
        }
        toast.success("Login berhasil! Mengalihkan ke dashboard...");
        window.location.href = "/admin";
      } else {
        toast.error(data.message || "Username atau password salah");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan atau server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f2229 0%, #11141b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <style>{`
        .fasel-login-box .btn {
          text-transform: none !important;
          letter-spacing: normal !important;
        }
        .fasel-login-box .form-control {
          font-size: 0.95rem !important;
        }
      `}</style>
      <div
        className="card shadow-lg border-0 fasel-login-box"
        style={{ maxWidth: "440px", width: "100%", borderRadius: "16px", overflow: "hidden" }}
      >
        <div className="card-header bg-dark text-white text-center py-4 border-0">
          <h3 className="fw-bold mb-1">
            <span style={{ color: "#f8b739" }}>FASEL</span> CONSULTING
          </h3>
          <p className="text-secondary small mb-0">Admin Management Portal</p>
        </div>

        <div className="card-body p-4 p-sm-5 bg-white">
          {alreadyLoggedIn && (
            <div className="alert alert-info py-2 px-3 mb-4 d-flex justify-content-between align-items-center small">
              <span>Sesi login Anda masih aktif.</span>
              <a href="/admin" className="fw-bold text-decoration-none">
                Buka Dashboard &rarr;
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small text-muted">USERNAME</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-user text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 py-2"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-muted">PASSWORD</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-lock text-muted"></i>
                </span>
                <input
                  type="password"
                  className="form-control bg-light border-start-0 py-2"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              disabled={submitting}
              style={{ backgroundColor: "#202c45", borderColor: "#202c45" }}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-light rounded text-center small text-muted">
            <i className="fas fa-info-circle me-1 text-primary"></i> Default Login:{" "}
            <strong>admin</strong> / <strong>suksesmuliaBUL123</strong>
          </div>

          <div className="text-center mt-3">
            <Link href="/" className="text-decoration-none small text-muted">
              <i className="fas fa-arrow-left me-1"></i> Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

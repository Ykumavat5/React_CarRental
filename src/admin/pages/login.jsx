import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../Context/AdminAuthContext"; // Adjust path
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useAdminAuth(); // login from context
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load required scripts dynamically
  useEffect(() => {
    const scripts = [
      "/assets/vendors/js/vendor.bundle.base.js",
      "/assets/js/off-canvas.js",
      "/assets/js/misc.js",
      "/assets/js/settings.js",
      "/assets/js/todolist.js",
    ];

    const scriptElements = scripts.map((src) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
      return s;
    });

    return () => {
      scriptElements.forEach((script) => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:3034/api/v1/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: "123456789",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        login(data.data.token, data.data);
        navigate("/admin");
      } else {
        setErrors({ general: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "Something went wrong, please try again" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Admin CSS */}
      <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css" />
      <link rel="stylesheet" href="/assets/vendors/ti-icons/css/themify-icons.css" />
      <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css" />
      <link rel="stylesheet" href="/assets/vendors/font-awesome/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />

      <div className="container-scroller" style={{ height: "100%" }}>
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="row w-100 m-0">
            <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
              <div className="card col-lg-4 mx-auto">
                <div className="card-body px-5 py-5">
                  <h3 className="card-title text-start mb-3">Admin Login</h3>

                  {errors.general && (
                    <div className="alert alert-danger" role="alert">
                      {errors.general}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        className="form-control p_input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        className="form-control p_input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                      <a href="/admin" className="forgot-pass">
                        Forgot password
                      </a>
                    </div>
                    <div className="text-center d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block enter-btn"
                        disabled={submitting}
                      >
                        {submitting ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <link rel="shortcut icon" href="/assets/images/favicon.png" />
    </>
  );
};

export default AdminLogin;

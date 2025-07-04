import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/driver")) {
      navigate("/driver/login");
    } else if (path.startsWith("/admin")) {
      navigate("/admin/login");
    } else {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
      <h2>⚠️ Something went wrong.</h2>
      <p>
        We’re working to fix the issue. Try refreshing the page or click{" "}
        <Link to="/">here</Link>.
      </p>
    </div>
  );
};

export default Error;

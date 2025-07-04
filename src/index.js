import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UnifiedAuthProvider from "./Context/UnifiedAuthProvider";

// import { AuthProvider } from "./AuthContext";
// import { DriverAuthProvider } from "./DriverAuthContext";
// import { AdminAuthProvider } from "./AdminAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>

    <UnifiedAuthProvider>
      <App />
    </UnifiedAuthProvider>
    {/* <AuthProvider>
      <DriverAuthProvider>
        <AdminAuthProvider>
        </AdminAuthProvider>
      </DriverAuthProvider>
    </AuthProvider> */}
  </BrowserRouter>
);

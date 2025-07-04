import { useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // User
import { DriverAuthProvider } from "./DriverAuthContext";
import { AdminAuthProvider } from "./AdminAuthContext";

const UnifiedAuthProvider = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  if (path.startsWith("/driver")) {
    return <DriverAuthProvider>{children}</DriverAuthProvider>;
  } else if (path.startsWith("/admin")) {
    return <AdminAuthProvider>{children}</AdminAuthProvider>;
  } else {
    return <AuthProvider>{children}</AuthProvider>;
  }
};

export default UnifiedAuthProvider;

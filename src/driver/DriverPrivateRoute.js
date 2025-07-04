// components/DriverPrivateRoute.js
import { Navigate } from "react-router-dom";
import { useDriverAuth } from "../Context/DriverAuthContext";

const DriverPrivateRoute = ({ children }) => {
  const { token } = useDriverAuth();

  if (!token) {
    return <Navigate to="/driver/login" replace />;
  }

  return children;
};

export default DriverPrivateRoute;

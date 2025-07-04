import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DriverAuthContext = createContext();

const DRIVER_TOKEN_KEY = "token_driver";
const DRIVER_USER_KEY = "user_driver";
const DRIVER_EXPIRY_KEY = "expiry_driver";
const EXPIRY_DURATION = 9 * 60 * 60 * 1000; // 9 hours

export const DriverAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSessionValid = () => {
    const expiry = localStorage.getItem(DRIVER_EXPIRY_KEY);
    if (!expiry) return false;
    return new Date().getTime() < parseInt(expiry);
  };

  const getInitialUser = () => {
    if (!isSessionValid()) {
      localStorage.removeItem(DRIVER_TOKEN_KEY);
      localStorage.removeItem(DRIVER_USER_KEY);
      localStorage.removeItem(DRIVER_EXPIRY_KEY);
      return null;
    }
    const storedUser = localStorage.getItem(DRIVER_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const getInitialToken = () => {
    return isSessionValid() ? localStorage.getItem(DRIVER_TOKEN_KEY) : null;
  };

  const [token, setToken] = useState(getInitialToken);
  const [user, setUser] = useState(getInitialUser);

  const login = (t, u) => {
    const expiryTime = new Date().getTime() + EXPIRY_DURATION;
    localStorage.setItem(DRIVER_TOKEN_KEY, t);
    localStorage.setItem(DRIVER_USER_KEY, JSON.stringify(u));
    localStorage.setItem(DRIVER_EXPIRY_KEY, expiryTime.toString());
    setToken(t);
    setUser(u);
  };

  const logout = useCallback(() => {
    localStorage.removeItem(DRIVER_TOKEN_KEY);
    localStorage.removeItem(DRIVER_USER_KEY);
    localStorage.removeItem(DRIVER_EXPIRY_KEY);
    setToken(null);
    setUser(null);

    // ✅ Redirect to /driver/login if path includes "/driver", else to "/"
    if (location.pathname.includes("/driver")) {
      navigate("/driver/login", { replace: true });
    } else if (location.pathname.includes("/admin")) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, location]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        logout();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [logout]);

  return (
    <DriverAuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </DriverAuthContext.Provider>
  );
};

export const useDriverAuth = () => useContext(DriverAuthContext);

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminAuthContext = createContext();

const ADMIN_TOKEN_KEY = "token_admin";
const ADMIN_USER_KEY = "user_admin";
const ADMIN_EXPIRY_KEY = "expiry_admin";
const EXPIRY_DURATION = 9 * 60 * 60 * 1000; // 9 hours

export const AdminAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSessionValid = () => {
    const expiry = localStorage.getItem(ADMIN_EXPIRY_KEY);
    if (!expiry) return false;
    return new Date().getTime() < parseInt(expiry);
  };

  const getInitialUser = () => {
    if (!isSessionValid()) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
      localStorage.removeItem(ADMIN_EXPIRY_KEY);
      return null;
    }
    const storedUser = localStorage.getItem(ADMIN_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const getInitialToken = () => {
    return isSessionValid() ? localStorage.getItem(ADMIN_TOKEN_KEY) : null;
  };

  const [token, setToken] = useState(getInitialToken);
  const [user, setUser] = useState(getInitialUser);

  // const login = (t, u) => {
  //   const expiryTime = new Date().getTime() + EXPIRY_DURATION;
  //   localStorage.setItem(ADMIN_TOKEN_KEY, t);
  //   localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(u));
  //   localStorage.setItem(ADMIN_EXPIRY_KEY, expiryTime.toString());
  //   setToken(t);
  //   setUser(u);
  // };

  const login = (t, u) => {
    const expiryTime = new Date().getTime() + EXPIRY_DURATION;
  
    const safeUser = {
      id: u.id,
      name: u.name,
      email: u.email,
      profile_image: u.profile_image,
      user_type: u.user_type,
      avg_rating: u.avg_rating
    };
  
    localStorage.setItem(ADMIN_TOKEN_KEY, t);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(safeUser));
    localStorage.setItem(ADMIN_EXPIRY_KEY, expiryTime.toString());
  
    setToken(t);
    setUser(safeUser);
  };
  
  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem(ADMIN_EXPIRY_KEY);
    setToken(null);
    setUser(null);

    // Conditional redirect based on current path
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/login", { replace: true });
    } else if (location.pathname.startsWith("/driver")) {
      navigate("/driver/login", { replace: true });
    } else {
      navigate("/jbckx", { replace: true });
    }
  }, [navigate, location]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        logout();
      }
    }, 60 * 1000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [logout]);

  return (
    <AdminAuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

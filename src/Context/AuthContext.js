import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const TOKEN_KEY = "token_carRental";
const USER_KEY = "user_carRental";
const EXPIRY_KEY = "expiry_carRental"; // new key for expiration timestamp
const EXPIRY_DURATION = 9 * 60 * 60 * 1000; // 9 hours in milliseconds 

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSessionValid = () => {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return false;
    return new Date().getTime() < parseInt(expiry);
  };

  const getInitialUser = () => {
    if (!isSessionValid()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      return null;
    }
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const getInitialToken = () => {
    return isSessionValid() ? localStorage.getItem(TOKEN_KEY) : null;
  };

  const [token, setToken] = useState(getInitialToken);
  const [user, setUser] = useState(getInitialUser);

  // const login = (t, u) => {
  //   const expiryTime = new Date().getTime() + EXPIRY_DURATION;
  //   localStorage.setItem(TOKEN_KEY, t);
  //   localStorage.setItem(USER_KEY, JSON.stringify(u));
  //   localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
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
      avg_rating: u.avg_rating,
    };
  
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
  
    setToken(t);
    setUser(safeUser);
  };
  
  // const logout = useCallback(() => {
  //   localStorage.removeItem(TOKEN_KEY);
  //   localStorage.removeItem(USER_KEY);
  //   localStorage.removeItem(EXPIRY_KEY);
  //   setToken(null);  // This causes a re-render
  //   setUser(null);   // This too
  //   console.log("nav to user dashhboard");

  //   navigate("/", { replace: true }); // Navigate to login/home
  // }, [navigate]);

  // Automatically log out when session expires

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    setToken(null);
    setUser(null);

    // Check if path does NOT contain 'driver' or 'admin'
    const path = location.pathname.toLowerCase();
    if (!path.includes("driver") && !path.includes("admin")) {
      console.log("changing to /");
      
      navigate("/", { replace: true });
    }
  }, [navigate, location]);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isSessionValid()) {
  //       logout();
  //     }
  //   }, 60 * 1000);

  //   return () => clearInterval(interval);
  // }, [logout]);

  useEffect(() => {
    const interval = setInterval(() => {
      const path = location.pathname.toLowerCase();
      const isDriverOrAdmin = path.includes("driver") || path.includes("admin");
  
      if (!isSessionValid() && !isDriverOrAdmin) {
        logout();
      }
    }, 60 * 1000);
  
    return () => clearInterval(interval);
  }, [logout, location]);
  

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

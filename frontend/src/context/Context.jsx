// contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";

// Create the context
export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("No valid session - user not logged in");
        } else {
          console.error("Error loading user:", error);
        }
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error; // Re-throw for error handling in components
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Role checking functions
  const hasRole = (roleName) => {
    return user?.role === roleName;
  };

  const isAdmin = () => {
    return hasRole("admin");
  };

  // Check if user is passenger
  const isPassenger = () => {
    return hasRole("passenger");
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
    isPassenger,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

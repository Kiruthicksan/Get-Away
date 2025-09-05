import { useState , useEffect} from "react";
import { AuthContext } from "./Context";
import { api } from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

   

  // Load user on app start
  useEffect(() => {
     console.log("Running useEffect to load user...");
    const loadUser = async () => {
      try {
        const response = await api.get("/auth/profile");
        
       
        const userData = response.data.user || response.data;
        setUser(userData);
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

  
  const login = async (email, password) => {
    try {
         console.log("Login start");
      setLoading(true); 
      const response = await api.post("/auth/login", { email, password });
      
     
      const userData = response.data.user || response.data;
      setUser(userData);
      setIsAuthenticated(true);
      
      return response.data;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false); 
       
    }
     
  };

  // Logout function - FIXED
  const logout = async () => {

  try {
   
    setLoading(true);
    
   
    await api.post("/auth/logout");
   
    
  } catch (error) {
    console.error(" API call failed:", error);
  } finally {
   
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    
  }
};

  
  const hasRole = (roleName) => {
    return user?.role === roleName;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isPassenger = () => {
    return user?.role === 'passenger';
  };

  
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
    isPassenger,
    setUser,
    setIsAuthenticated
    
    
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
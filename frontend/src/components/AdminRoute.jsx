import { useAuth } from "../context/useAuth";
import {Navigate} from 'react-router-dom'


const AdminRoute = ({children}) => {
     const { isAuthenticated, isAdmin, loading } = useAuth();
      if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated && isAdmin() ? children: <Navigate to = "/unauthorized" replace />
}
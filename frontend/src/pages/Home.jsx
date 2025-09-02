import React from "react";

import {useAuth} from "../context/useAuth";
import AdminHome from "./AdminHome";
import PassengerHome from "./PassengerHome";





const Home = () => {
  const { isAdmin, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
  
    isAdmin() ? <AdminHome />  : <PassengerHome />

  )



  
}
export default Home;

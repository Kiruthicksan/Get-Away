// MainNavbar.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import AdminNavbar from "./AdminNavbar";
import PassengerNavbar from "./PassengerNavbar";
import GuestNavbar from "./GuestNavbar";

const MainNavbar = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <GuestNavbar />;
  }

  return isAdmin() ? <AdminNavbar /> : <PassengerNavbar />;
};

export default MainNavbar;

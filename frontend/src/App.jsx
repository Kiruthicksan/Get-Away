import Register from "./pages/Register";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import MainNavbar from "./components/navbar/MainNavbar";
import AdminRoute from "./components/AdminRoute";
import AdminFlightManagement from "./pages/AdminFlightManagement";
import FlightsTable from "./pages/Flights";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes with navbar */}
          <Route
            path="/*"
            element={
              <>
                <MainNavbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/my-bookings"
                    element={
                      <ProtectedRoute>
                        <MyBookings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manage-bookings"
                    element={
                      <AdminRoute>
                        <AdminFlightManagement />
                      </AdminRoute>
                    }
                  />
                  <Route path="/flights" element = {
                    <ProtectedRoute>
                      <FlightsTable />
                    </ProtectedRoute>
                  } />
                  <Route path="/booking-form/:id" element={<BookingForm />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                </Routes>
              </>
            }
          />

          {/* Routes without navbar */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

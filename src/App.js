import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// Navigate
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Login from "./components/Login";
import Error from "./Pages/Error";
import Signup from "./components/Signup";
import MyRides from "./Pages/MyRides";

import DriverLogin from "./driver/Login";
import DriverSignup from "./driver/Signup";
import DriverNavbar from "./driver/Navbar";
import DriverDashboard from "./Pages/driver/DriverDashboard";
import DriverPrivateRoute from "./driver/DriverPrivateRoute";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./admin/pages/dashboard";
import UserList from "./admin/pages/userList";
import AdminLogin from "./admin/pages/login";
import RideList from "./admin/pages/rideList";
import DriverList from "./admin/pages/driverList";
import AdminPrivateRoute from "./admin/components/AdminPrivateRoute";
import PublicAdminRoute from "./admin/components/PublicAdminRoute";

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Logic to hide navbar based on keywords in the URL
  const hideNavbarKeywords = ['admin', 'login', 'register'];
  const hideNavbar = hideNavbarKeywords.some(keyword => path.includes(keyword));

  // Detect if it's a driver route (for conditional DriverNavbar rendering)
  const isDriverRoute = path.startsWith('/driver');

  useEffect(() => {
    if (path.includes('/admin')) {
      document.title = 'Car Rental Admin';
    } else if (path.includes('/driver')) {
      document.title = 'Car Rental Driver';
    } else {
      document.title = 'Car Rental';
    }
  }, [path]);

  return (
    <>
      {!hideNavbar && (
        isDriverRoute ? <DriverNavbar /> : <Navbar />
      )}

      <Routes>
        {/* Public User Routes */}
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="myrides" element={<MyRides />} />
        <Route path="*" element={<Error />} />

        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />
        {/* Admin Routes (Nested inside AdminLayout) */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="rides" element={<RideList />} />
          <Route path="drivers" element={<DriverList />} />
        </Route> */}

        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* <Route index element={<Navigate to="home" />} /> 
            <Route path="home" element={<AdminDashboard />} /> */}
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="users" element={<UserList />} />
            <Route path="rides" element={<RideList />} />
            <Route path="drivers" element={<DriverList />} />
          </Route>
        </Route>

        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route
          path="/admin/login"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />

        {/* Driver Routes */}
        <Route path="driver/login" element={<DriverLogin />} />
        <Route path="driver/register" element={<DriverSignup />} />
        <Route path="driver/dashboard" element={
          <DriverPrivateRoute>
            <DriverDashboard />
          </DriverPrivateRoute>
        } />
      </Routes>

    </>
  );
}

export default App;

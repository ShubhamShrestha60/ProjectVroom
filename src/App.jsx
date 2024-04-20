import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import TopNav from "./components/TopNav/TopNav";
import Booking from "./pages/Bookings";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import AddCar from "./pages/addCar";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<BookingLayout />} />
          <Route path="/settings" element={<SettingsLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/addcar" element={<AddCarLayout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

const BookingLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Booking />
    </>
  );
};

const SettingsLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Settings />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Dashboard />
    </>
  );
};
const AddCarLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <AddCar />
    </>
  );
};
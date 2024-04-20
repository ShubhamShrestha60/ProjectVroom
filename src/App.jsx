import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Login from './components/Login&Signup/login'
// import Signup from './components/Login&Signup/signup'
import React, { useState } from 'react';
import Home from './components/home/home'
import Navbar from './components/Header/Navbar'
import Footer from './components/footer/footer'
import Cars from "./components/SearchResults/cars"

export default function App() {
  const [results, setResults] = useState([]);
  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    
     <Route path="/" element = {<Home setResults={setResults} results={results} />}/>
     <Route
          path="/cars"
          element={<Cars results={results} />}
        />

    </Routes>
    
    <Footer/>
    </BrowserRouter>
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
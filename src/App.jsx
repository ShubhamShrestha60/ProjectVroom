import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './components/Login&Signup/login'
import Signup from './components/Login&Signup/signup'
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
        {/* Conditionally render Navbar and Footer */}
        {(window.location.pathname !== '/' && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) && (
          <div>
            <Navbar />
          </div>
        )}

        {/* Routes for different pages */}
        <Routes>
          {/* Authentication Routes */}
          <Route index element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Main Application Routes */}
          <Route path="/home" element={<Home setResults={setResults} results={results} />} />
          <Route path="/cars" element={<Cars results={results} />} />
        </Routes>

        {/* Conditionally render Footer */}
        {(window.location.pathname !== '/' && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) && (
          <div>
            <Footer />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

    

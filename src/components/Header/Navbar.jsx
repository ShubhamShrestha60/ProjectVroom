import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom'; 

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const hiddenPaths = ['/login', '/signup'];

  // Check if the current location is in the array of hidden paths
  const isHidden = hiddenPaths.includes(location.pathname);

  // If the current path is in the hiddenPaths array, don't render the footer
  if (isHidden) {
    return null;
  }

  return (
    <div className="main_header">
    <nav className="nav-container">
      <Link to="/" className="title">
        Vroom
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/manage-booking">Manage Booking</NavLink>
        </li>
        <li>
          <NavLink to="/how-it-works">How it works?</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log out </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};
export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";
import "./TopNavbar.css";

const TopNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="top-navbar">
      {/* <button className="menu-btn" onClick={() => toggleSidebar()}>
        <Menu size={24} />
      </button> */}
      <h2 className="logo">Expense Tracker</h2>
      <div className="nav-icons">
        <button className="icon-btn">
          <Bell size={24} />
        </button>
        <Link to="/profile" className="icon-btn">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;

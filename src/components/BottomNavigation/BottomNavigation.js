import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart, Settings, User, PlusCircle } from "lucide-react";
import "./BottomNavigation.css";

const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">
      <NavLink to="/" className="nav-item">
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/reports" className="nav-item">
        <BarChart size={24} />
        <span>Reports</span>
      </NavLink>
      <NavLink to="/addpages" className="nav-item add-button">
        <PlusCircle size={32} />
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        <Settings size={24} />
        <span>Settings</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;

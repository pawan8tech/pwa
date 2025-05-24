import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  BarChart,
  Settings,
  CreditCard,
  User,
  PlusCircle,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <Home size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/reports" className="sidebar-link">
            <BarChart size={20} />
            Reports
          </Link>
        </li>
        <li>
          <Link to="/addpages" className="sidebar-link">
            <PlusCircle size={20} />
            Add Record
          </Link>
        </li>
        <li>
          <Link to="/budget" className="sidebar-link">
            <CreditCard size={20} />
            Budget
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <Settings size={20} />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

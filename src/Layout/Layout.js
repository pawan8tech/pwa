import React, { useEffect, useState } from "react";
import "./Layout.css";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="wrapper">
      {!isMobile && (
        <div className="header">
          <TopNavbar />
        </div>
      )}
      <div className={isMobile ? "mobilePageContianer" : "pageContainer"}>
        {!isMobile && (
          <div className="sidepanelWrapper">
            <Sidebar />
          </div>
        )}
        <div className={isMobile ? "mobileContianer" : "container"}>
          {children}
        </div>
        {isMobile && (
          <div className="footer">
            <BottomNavigation />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

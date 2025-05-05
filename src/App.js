import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Layout from "./Layout/Layout";
import AuthGuard from "./auth/AuthGuard";
import ExpenseTracker from "./pages/ExpenseTracker";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <AuthGuard>
                  <>
                    <Layout>
                      <div className="main-content">
                        <Routes>
                          <Route path="/" element={<ExpenseTracker />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/addpages" element={<AddPage />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </div>
                    </Layout>
                  </>
                </AuthGuard>
              }
            />
          </Routes>
        </div>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

// import "./App.css";
// import { useState, useEffect } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ExpenseTracker from "./pages/ExpenseTracker";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import Navbar from "./components/Navbar";
// function App() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [currency, setCurrency] = useState(
//     localStorage.getItem("currency") || "USD"
//   );

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     localStorage.setItem("currency", currency);
//   }, [currency]);

//   const handleThemeChange = (isDarkMode) => {
//     setTheme(isDarkMode ? "dark" : "light");
//   };

//   const handleCurrencyChange = (newCurrency) => {
//     setCurrency(newCurrency);
//   };
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<ExpenseTracker />} />
//           <Route path="/Reports" element={<Reports />} />
//           <Route
//             path="/settings"
//             element={
//               <Settings
//                 onThemeChange={handleThemeChange}
//                 onCurrencyChange={handleCurrencyChange}
//               />
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import Home from "./Home";
// import User from "./User";
// import About from "./About";
// import Downloads from "./Downloads";

// const [mode, setMode] = useState(navigator.onLine ? "online" : "offline");
// useEffect(() => {
//   const handleOnlineStatusChange = () => {
//     setMode(navigator.onLine ? "online" : "offline");
//     console.log("--mode----", mode);
//   };

//   window.addEventListener("online", handleOnlineStatusChange);
//   window.addEventListener("offline", handleOnlineStatusChange);

//   return () => {
//     window.removeEventListener("online", handleOnlineStatusChange);
//     window.removeEventListener("offline", handleOnlineStatusChange);
//   };
// }, []);

/* <div>
{mode === "offline" ? (
  <div className="alert alert-warning" role="alert">
    You are in offline mode or some issue with connection
  </div>
) : null}
</div> */

/* <Route path="/" element={<Home />} />
<Route path="/Downloads" element={<Downloads />} />
<Route path="/User" element={<User />} />
<Route path="/About" element={<About />} /> */

// <Link to="/" className="nav-link">
// Home
// </Link>
// <Link to="/Downloads" className="nav-link">
// Downloads
// </Link>
// <Link to="/User" className="nav-link">
// User
// </Link>
// <Link to="/About" className="nav-link">
// About PWA
// </Link>

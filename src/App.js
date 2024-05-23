// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import swDev from "./swDev";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import About from "./About";
import Downloads from "./Downloads";

function App() {
  const [mode, setMode] = useState(navigator.onLine ? "online" : "offline");
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setMode(navigator.onLine ? "online" : "offline");
      console.log("--mode----", mode);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar bg="primary" data-bs-theme="dark">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/Downloads" className="nav-link">
              Downloads
            </Link>
            <Link to="/User" className="nav-link">
              User
            </Link>
            <Link to="/About" className="nav-link">
              PWA
            </Link>
          </Nav>
        </Navbar>
        <div>
          {mode === "offline" ? (
            <div className="alert alert-warning" role="alert">
              You are in offline mode or some issue with connection
            </div>
          ) : null}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Downloads" element={<Downloads />} />
          <Route path="/User" element={<User />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

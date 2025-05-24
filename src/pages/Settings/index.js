import React, { useState } from "react";
import "./Settings.css";

function Settings({ onThemeChange, onCurrencyChange }) {
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    onCurrencyChange(event.target.value);
  };

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      onThemeChange(newMode);
      return newMode;
    });
  };
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="setting-item">
        <label>Currency:</label>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Dark Mode:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleThemeToggle}
        />
      </div>
    </div>
  );
}

export default Settings;

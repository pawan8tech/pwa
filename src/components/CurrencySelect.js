import React, { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

function CurrencySelect() {
  const { currency, setCurrency } = useContext(CurrencyContext);

  return (
    <div className="currency-select">
      <label>Select Currency: </label>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
        <option value="GBP">£ GBP</option>
      </select>
    </div>
  );
}

export default CurrencySelect;

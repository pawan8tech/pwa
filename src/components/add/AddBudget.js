import React, { useState } from "react";
import "./Form.css";
import { toast } from "react-hot-toast";

function AddBudgetForm() {
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!budget) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (budget <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    // API Call (simulate)
    console.log("Submitting budget:", budget);
    toast.success("Budget added successfully!");

    setBudget("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Set Budget</h2>

      <div className="form-group">
        <label>Monthly Budget</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Set Budget
      </button>
    </form>
  );
}

export default AddBudgetForm;

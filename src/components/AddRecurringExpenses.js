import React, { useState } from "react";
import "../styles/Form.css";
import { toast } from "react-hot-toast";

function AddRecurringForm() {
  const [recurring, setRecurring] = useState({
    name: "",
    amount: "",
    category: "",
    interval: "",
  });

  const handleChange = (e) => {
    setRecurring({ ...recurring, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !recurring.name ||
      !recurring.amount ||
      !recurring.category ||
      !recurring.date
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (recurring.amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    // API Call (simulate)
    console.log("Submitting recurring:", recurring);
    toast.success("Recurring Expense added successfully!");

    setRecurring({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Recurring Expense</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={recurring.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          value={recurring.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={recurring.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Interval</label>
        <select
          name="interval"
          value={recurring.interval}
          onChange={handleChange}
          required
        >
          <option value="">Select Interval</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Add Recurring
      </button>
    </form>
  );
}

export default AddRecurringForm;

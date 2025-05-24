import React, { useState } from "react";
import "./Form.css";
import { toast } from "react-hot-toast";

function AddExpenseForm() {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !expense.name ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (expense.amount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    // API Call (simulate)
    console.log("Submitting expense:", expense);
    toast.success("Expense added successfully!");

    setExpense({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={expense.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={expense.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
}

export default AddExpenseForm;

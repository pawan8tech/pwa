import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "../../styles/Form.css";

function AddRecord() {
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const [budgetCategory, setBudgetCategory] = useState("Food");
  const [budgetAmount, setBudgetAmount] = useState("");

  const [recurringCategory, setRecurringCategory] = useState("Food");
  const [recurringAmount, setRecurringAmount] = useState("");
  const [recurringFrequency, setRecurringFrequency] = useState("Monthly");

  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);

  // Categories options for expense and budget
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ];
  const frequencies = ["Monthly", "Quarterly", "Annually"];

  // Handle form submission for Expenses
  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    if (!expenseAmount || !expenseDescription) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (expenseAmount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      category: expenseCategory,
      amount: expenseAmount,
      description: expenseDescription,
    };

    setExpenses([...expenses, newExpense]);
    toast.success("Expense added successfully!");

    // Reset form fields
    setExpenseAmount("");
    setExpenseDescription("");
  };

  // Handle form submission for Budget
  const handleBudgetSubmit = (e) => {
    e.preventDefault();

    if (!budgetAmount) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (budgetAmount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    const newBudget = {
      id: Date.now(),
      category: budgetCategory,
      amount: budgetAmount,
    };

    setBudgets([...budgets, newBudget]);
    toast.success("Budget added successfully!");

    // Reset form fields
    setBudgetAmount("");
  };

  // Handle form submission for Recurring Expenses
  const handleRecurringSubmit = (e) => {
    e.preventDefault();

    if (!recurringAmount) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (recurringAmount <= 0) {
      toast.error("Amount must be greater than 0!");
      return;
    }

    const newRecurringExpense = {
      id: Date.now(),
      category: recurringCategory,
      amount: recurringAmount,
      frequency: recurringFrequency,
    };

    setRecurringExpenses([...recurringExpenses, newRecurringExpense]);
    toast.success("Recurring expense added successfully!");

    // Reset form fields
    setRecurringAmount("");
  };

  return (
    <div className="add-record-container">
      <div className="form-container">
        <h2>Add Expense</h2>
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Expense
          </button>
        </form>

        <h3>Expense List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-container">
        <h2>Add Budget</h2>
        <form onSubmit={handleBudgetSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select
              value={budgetCategory}
              onChange={(e) => setBudgetCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Set Budget
          </button>
        </form>

        <h3>Budget List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td>{budget.category}</td>
                <td>{budget.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-container">
        <h2>Add Recurring Expense</h2>
        <form onSubmit={handleRecurringSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select
              value={recurringCategory}
              onChange={(e) => setRecurringCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={recurringAmount}
              onChange={(e) => setRecurringAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Frequency</label>
            <select
              value={recurringFrequency}
              onChange={(e) => setRecurringFrequency(e.target.value)}
              required
            >
              {frequencies.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Recurring Expense
          </button>
        </form>

        <h3>Recurring Expenses List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {recurringExpenses.map((recurring) => (
              <tr key={recurring.id}>
                <td>{recurring.category}</td>
                <td>{recurring.amount}</td>
                <td>{recurring.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddRecord;

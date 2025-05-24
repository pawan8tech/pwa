import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import BudgetTracker from "../components/BudgetTracker";
import MonthlySummary from "../components/MonthlySummary/MonthlySummary";
import "../styles/ExpenseTracker.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [budget, setBudget] = useState(localStorage.getItem("budget") || "");
  const [categories, setCategories] = useState([
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);

    const savedRecurring =
      JSON.parse(localStorage.getItem("recurringExpenses")) || [];
    setRecurringExpenses(savedRecurring);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  return (
    <div className="expense-tracker-container">
      <h1 className="text-center">Expense Tracker</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>
      <ExpenseList expenses={expenses} />
      <BudgetTracker
        expenses={expenses}
        recurringExpenses={recurringExpenses}
      />

      <MonthlySummary
        expenses={expenses}
        budget={budget}
        recurringExpenses={recurringExpenses}
      />
    </div>
  );
}

export default ExpenseTracker;

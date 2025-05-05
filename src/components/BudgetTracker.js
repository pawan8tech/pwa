import React, { useState, useEffect } from "react";
import "../styles/BudgetTracker.css";

const BudgetTracker = ({ expenses = [], recurringExpenses = [] }) => {
  const [budget, setBudget] = useState(0);
  const totalExpenses = expenses.reduce(
    (acc, exp) => acc + parseFloat(exp.amount),
    0
  );
  const totalRecurring = recurringExpenses.reduce(
    (acc, exp) => acc + parseFloat(exp.amount),
    0
  );
  const remainingBudget = budget - (totalExpenses + totalRecurring);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      setBudget(parseFloat(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  return (
    <div className="budget-tracker">
      <h2>Budget Tracker</h2>
      <div className="budget-input">
        <label>Set Monthly Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div className="budget-summary">
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Recurring Expenses: ${totalRecurring.toFixed(2)}</p>
        <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((totalExpenses + totalRecurring) / budget) * 100}%`,
            }}
          ></div>
        </div>
        {remainingBudget < 0 && <p className="alert">⚠️ Budget Exceeded!</p>}
      </div>
    </div>
  );
};

export default BudgetTracker;

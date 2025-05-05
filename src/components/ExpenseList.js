import React, { useState } from "react";
import "../styles/ExpenseList.css"; // Import the CSS file

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = expenses.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="expense-list-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <span className="pagination-info">
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="pagination-button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;

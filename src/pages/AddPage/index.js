// AddPage.js
import React, { useState } from "react";
import AddExpenseForm from "../../components/add/AddExpense";
import AddBudgetForm from "../../components/add/AddBudget";
import AddRecurringForm from "../../components/add/AddRecurringExpenses";
import "./AddPage.css";

function AddPage() {
  const [activeTab, setActiveTab] = useState("expense");

  const renderForm = () => {
    switch (activeTab) {
      case "expense":
        return <AddExpenseForm />;
      case "budget":
        return <AddBudgetForm />;
      case "recurring":
        return <AddRecurringForm />;
      default:
        return null;
    }
  };

  return (
    <div className="add-page-container">
      <div className="tab">
        <div
          className={`tabContentLeft  ${
            activeTab === "expense" ? "active" : ""
          }`}
          onClick={() => setActiveTab("expense")}
        >
          Add Expense
        </div>
        <div
          className={`tabContent ${activeTab === "budget" ? "active" : ""}`}
          onClick={() => setActiveTab("budget")}
        >
          Add Budget
        </div>
        <div
          className={`tabContentRight ${
            activeTab === "recurring" ? "active" : ""
          }`}
          onClick={() => setActiveTab("recurring")}
        >
          Add Recurring
        </div>
      </div>

      <div className="form-container">{renderForm()}</div>
    </div>
  );
}

export default AddPage;

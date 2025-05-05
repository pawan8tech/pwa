import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "../styles/Reports.css";
import { useState, useEffect } from "react";
import Charts from "../components/Charts";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const expenseSnapshot = await getDocs(collection(db, "expenses"));
      const expenseList = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expenseList);

      const budgetSnapshot = await getDocs(collection(db, "budget"));
      if (!budgetSnapshot.empty) {
        setBudget(budgetSnapshot.docs[0].data().amount);
      }
    };
    fetchData();
  }, []);
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    amount: categoryData[category],
  }));

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const budgetData = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: Math.max(budget - totalSpent, 0) },
  ];

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#FF9800",
    "#9C27B0",
  ];
  return (
    <div className="reports-container">
      <h2>Expense Reports</h2>

      <div className="chart-section">
        <h3>Category-wise Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Budget Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={budgetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {budgetData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="reports-container">
        <h2>Expense Reports</h2>
        <Charts expenses={expenses} />
      </div>
    </div>
  );
};
export default Reports;

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./MonthlySummary.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function MonthlySummary({
  expenses,
  currency,
  budget,
  recurringExpenses = [],
}) {
  const totalExpenses = expenses?.reduce(
    (acc, exp) => acc + parseFloat(exp.amount),
    0
  );
  const totalRecurring = recurringExpenses?.reduce(
    (acc, rec) => acc + parseFloat(rec.amount),
    0
  );
  const remainingBudget = budget - totalExpenses - totalRecurring;

  const data = [
    { name: "Total Expenses", value: totalExpenses },
    { name: "Recurring Expenses", value: totalRecurring },
    {
      name: "Remaining Budget",
      value: remainingBudget < 0 ? 0 : remainingBudget,
    },
  ];

  return (
    <div className="monthly-summary">
      <h3>Monthly Summary</h3>
      {/* <div className="summary-details">
        <p>
          <strong>Total Expenses:</strong> {currency}{" "}
          {totalExpenses?.toFixed(2)}
        </p>
        <p>
          <strong>Recurring Expenses:</strong> {currency}{" "}
          {totalRecurring.toFixed(2)}
        </p>
        <p>
          <strong>Remaining Budget:</strong> {currency}{" "}
          {remainingBudget.toFixed(2)}
        </p>
      </div> */}
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default MonthlySummary;

import { Bar as ChartJSBar, Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie as RechartsPie,
  Cell,
  Legend as RechartsLegend,
} from "recharts";
import "./Reports.css";
import { useState, useEffect } from "react";
import Charts from "../../components/Charts";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    amount: categoryData[category],
  }));
  useEffect(() => {
    // Simulate fetching expenses and budget with random data
    const categories = ["Food", "Bills", "Shopping", "Transport", "Other"];
    const randomExpenses = Array.from({ length: 15 }, () => ({
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: (Math.random() * 500 + 50).toFixed(2),
    }));
    setExpenses(randomExpenses);
    setBudget(3000 + Math.floor(Math.random() * 2000)); // random budget between 3000-5000
  }, []);
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
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses",
        data: [500, 700, 800, 650, 950],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ["Food", "Bills", "Shopping", "Transport", "Other"],
    datasets: [
      {
        label: "Categories",
        data: [400, 300, 200, 100, 150],
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const barChartData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Total Expenses",
        data: [1200, 1500, 900],
        backgroundColor: "#34D399",
      },
    ],
  };
  return (
    <div className="reports-container">
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <input type="date" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          <select className="border p-2 rounded">
            <option>All Categories</option>
            <option>Food</option>
            <option>Bills</option>
            <option>Shopping</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Export PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Export CSV
          </button>
        </div>
      </div>
      <div className="chartsContainer">
        <div className="chart-wrapper">
          <h2 className="text-lg font-semibold mb-2">Monthly Comparison</h2>
          <Line data={lineChartData} />
        </div>
        <div className="chart-wrapper">
          <h2 className="text-lg font-semibold mb-2">
            Top Spending Categories
          </h2>
          <ul className="divide-y">
            <li className="py-2 flex justify-between">
              <span>Food</span>
              <span>$400</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Bills</span>
              <span>$300</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Shopping</span>
              <span>$200</span>
            </li>
          </ul>
        </div>

        {/* <div className="chart-wrapper">
          <h2 className="text-lg font-semibold mb-2">Monthly Comparison</h2>
          <ChartJSBar data={barChartData} />
        </div> */}
        <div className="chart-wrapper">
          <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
          <Pie data={pieChartData} />
        </div>

        <div className="chart-wrapper">
          <h3>Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="amount" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>Budget Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <RechartsPie
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
              </RechartsPie>
              <RechartsTooltip />
              <RechartsLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Reports;

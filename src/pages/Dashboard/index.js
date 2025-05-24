import React from "react";
// import { Card } from "../components/card/dashboardCard/card";
import "./dashboard.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  PieChart,
  TrendingUp,
} from "lucide-react";
import MonthlySummary from "../../components/MonthlySummary/MonthlySummary";
import BudgetTracker from "../../components/BudgetTracker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const totalStats = [
    {
      title: "Total Expenses",
      amount: "$2,300",
      icon: <ArrowDown className="text-red-500" />,
      color: "#10B981",
    },
    {
      title: "Monthly Budget",
      amount: "$3,000",
      icon: <PieChart className="text-blue-500" />,
      color: "#3B82F6",
    },
    {
      title: "Remaining Budget",
      amount: "$700",
      icon: <TrendingUp className="text-green-500" />,
      color: "#8B5CF6",
    },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses",
        data: [500, 700, 800, 400, 900],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  const pieData = {
    labels: ["Food", "Bills", "Shopping", "Transport", "Other"],
    datasets: [
      {
        label: "Expenses by Category",
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

  const recentTransactions = [
    { name: "Grocery", date: "2025-05-05", amount: "$50" },
    { name: "Electric Bill", date: "2025-05-04", amount: "$120" },
    { name: "Movie", date: "2025-05-03", amount: "$15" },
    { name: "Petrol", date: "2025-05-02", amount: "$40" },
    { name: "Movie", date: "2025-05-03", amount: "$15" },
    { name: "Petrol", date: "2025-05-02", amount: "$40" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-leftContainer">
        <div className="dashboard-card-Container">
          {totalStats.map((stat) => (
            <div
              key={stat?.title}
              className="dashboard-card"
              style={{ backgroundColor: stat?.color }}
            >
              <div className="amount-container">
                <div>{stat?.icon}</div>
                <h5>{stat?.amount}</h5>
              </div>
              <h5>{stat?.title}</h5>
              {/* <p>This Month</p> */}
            </div>
          ))}
        </div>

        <div className="chart-box-container">
          <MonthlySummary />
          <div className="chart-box">
            <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
      <div className="transaction-box">
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <ul className="recent-transactions-list">
          {recentTransactions.map((tx, idx) => (
            <li key={idx} className="transaction-meta">
              <div>
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {tx.date}
                </p>
              </div>
              <p className="font-semibold">{tx.amount}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="chart-box">
        <h2 className="text-xl font-semibold mb-2">Expenses Over Time</h2>
        <Bar data={barData} />
      </div>

      <BudgetTracker /> */}
    </div>
  );
};

export default Dashboard;

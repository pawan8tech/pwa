import { Bar, Line, Pie } from "react-chartjs-2";
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
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <input type="date" className="border p-2 rounded" />
        <input type="date" className="border p-2 rounded" />
        <select className="border p-2 rounded">
          <option>All Categories</option>
          <option>Food</option>
          <option>Bills</option>
          <option>Shopping</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Expense Trends Over Time</h2>
        <Line data={lineChartData} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
        <Pie data={pieChartData} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Monthly Comparison</h2>
        <Bar data={barChartData} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Top Spending Categories</h2>
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

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Export PDF
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default Reports;

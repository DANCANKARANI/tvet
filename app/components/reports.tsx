"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const reportRef = useRef<HTMLDivElement>(null);

  // Sample data for the report
  const reportData = {
    totalStudents: 3240,
    totalSponsors: 45,
    totalJobs: 120,
    activeStudents: 2800,
    recentRegistrations: [
      { name: "John Doe", date: "2023-05-15", status: "Active" },
      { name: "Jane Smith", date: "2023-05-14", status: "Pending" },
      { name: "Robert Johnson", date: "2023-05-13", status: "Active" },
    ],
  };

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Student Registrations",
        data: [120, 190, 300, 250, 200],
        backgroundColor: "#4F46E5",
      },
      {
        label: "Job Postings",
        data: [30, 40, 35, 45, 25],
        backgroundColor: "#10B981",
      },
    ],
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          padding: 20px;
        }
        .no-print {
          display: none !important;
        }
        .print-section {
          padding: 0;
          margin: 0;
        }
      }
    `,
  });

  // Wrapper function to handle the button click
  const handleExportClick = () => {
    handlePrint();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">System Reports</h2>
        <div className="flex space-x-3 no-print">
          <button
            onClick={handleExportClick}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FiDownload className="mr-2" />
            Export as PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            <FiPrinter className="mr-2" />
            Print Report
          </button>
        </div>
      </div>

      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-sm print-section">
        {/* Report Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">System Analytics Report</h1>
          <p className="text-gray-600">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Students" value={reportData.totalStudents} />
          <StatCard title="Total Sponsors" value={reportData.totalSponsors} />
          <StatCard title="Total Jobs" value={reportData.totalJobs} />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Monthly Activity</h3>
          <div className="h-96">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Student Registrations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b text-left">Name</th>
                  <th className="py-3 px-4 border-b text-left">Date</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.recentRegistrations.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{student.name}</td>
                    <td className="py-3 px-4 border-b">{student.date}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>© {new Date().getFullYear()} Your Organization Name</p>
          <p className="mt-1">Confidential - For internal use only</p>
        </div>
      </div>
    </div>
  );
}

// Reusable StatCard component
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h4 className="text-sm font-medium text-gray-500">{title}</h4>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);
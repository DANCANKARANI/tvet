"use client";
import { useEffect, useState } from "react";
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
import { FiUsers, FiBriefcase, FiDollarSign } from "react-icons/fi";
import Cookies from "js-cookie";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Analytics() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get("auth_token");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const [sponsorRes, studentRes, jobsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sponsor`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/student/all`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
        ]);

        if (!sponsorRes.ok || !studentRes.ok || !jobsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const sponsorData = await sponsorRes.json();
        const studentData = await studentRes.json();
        const jobsData = await jobsRes.json();

        setSponsors(sponsorData.data || []);
        setStudents(studentData.data || []);
        setJobs(jobsData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  const sponsorCount = sponsors?.length || 0;
  const studentCount = students?.length || 0;
  const jobCount = jobs?.length || 0;

  // Chart Data
  const barData = {
    labels: ["Sponsors", "Students", "Jobs"],
    datasets: [
      {
        label: "Count",
        data: [sponsorCount, studentCount, jobCount],
        backgroundColor: ["#4F46E5", "#10B981", "#3B82F6"],
        borderColor: ["#4F46E5", "#10B981", "#3B82F6"],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const pieData = {
    labels: ["Sponsors", "Students", "Jobs"],
    datasets: [
      {
        data: [sponsorCount, studentCount, jobCount],
        backgroundColor: ["#4F46E5", "#10B981", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        padding: 12,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Analytics</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<FiUsers className="text-indigo-500" size={24} />}
          title="Total Students"
          value={studentCount}
          change="+12%"
          trend="up"
        />
        <StatCard 
          icon={<FiDollarSign className="text-emerald-500" size={24} />}
          title="Total Sponsors"
          value={sponsorCount}
          change="+5%"
          trend="up"
        />
        <StatCard 
          icon={<FiBriefcase className="text-blue-500" size={24} />}
          title="Active Jobs"
          value={jobCount}
          change="+8%"
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-80">
            <Bar data={barData} options={options} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Distribution</h3>
          <div className="h-80">
            <Pie data={pieData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: string;
  trend: "up" | "down";
}

const StatCard = ({ icon, title, value, change, trend }: StatCardProps) => {
  const trendColor = trend === "up" ? "text-emerald-500" : "text-red-500";
  const trendIcon = trend === "up" ? "↑" : "↓";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50">{icon}</div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last period</span>
      </div>
    </div>
  );
};
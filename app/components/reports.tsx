"use client";
import { useEffect, useState, useRef } from "react";
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

interface Student {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  created_at?: string;
}

interface Sponsor {
  id: string;
  name: string;
  description: string;
  application_link: string;
  created_at?: string;
}

interface Job {
  id: string;
  title: string;
  role: string;
  application_link: string;
  created_at?: string;
}

interface ApiResponse<T> {
  data: T[];
  message: string;
  status_code: number;
  success: boolean;
}

export default function Reports() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [reportData, setReportData] = useState({
    totalStudents: 0,
    totalSponsors: 0,
    totalJobs: 0,
    recentRegistrations: [] as Student[],
    recentSponsors: [] as Sponsor[],
    recentJobs: [] as Job[],
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, sponsorsRes, jobsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/student/all`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sponsor`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job`),
        ]);

        if (!studentsRes.ok || !sponsorsRes.ok || !jobsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const studentsData: ApiResponse<Student> = await studentsRes.json();
        const sponsorsData: ApiResponse<Sponsor> = await sponsorsRes.json();
        const jobsData: ApiResponse<Job> = await jobsRes.json();

        setReportData({
          totalStudents: studentsData.data.length,
          totalSponsors: sponsorsData.data.length,
          totalJobs: jobsData.data.length,
          recentRegistrations: studentsData.data.slice(0, 5),
          recentSponsors: sponsorsData.data.slice(0, 5),
          recentJobs: jobsData.data.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ["Students", "Sponsors", "Jobs"],
    datasets: [
      {
        label: "Total Count",
        data: [reportData.totalStudents, reportData.totalSponsors, reportData.totalJobs],
        backgroundColor: ["#4F46E5", "#10B981", "#3B82F6"],
      }
    ],
  };

  const printOptions = {
    content: () => reportRef.current,
    documentTitle: "System Report",
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
      }
    `,
  };

  const handlePrint = useReactToPrint(printOptions);

  const handleExportClick = () => {
    handlePrint();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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

      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-sm">
        {/* Report Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">System Analytics Report</h1>
          <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Students" value={reportData.totalStudents} />
          <StatCard title="Total Sponsors" value={reportData.totalSponsors} />
          <StatCard title="Total Jobs" value={reportData.totalJobs} />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">System Overview</h3>
          <div className="h-96">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
        </div>

        {/* Recent Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Students */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recent Students</h3>
            <div className="space-y-2">
              {reportData.recentRegistrations.map((student) => (
                <div key={student.id} className="p-3 bg-white rounded border">
                  <p className="font-medium">{student.full_name}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-xs text-gray-500">
                    {student.created_at ? new Date(student.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sponsors */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recent Sponsors</h3>
            <div className="space-y-2">
              {reportData.recentSponsors.map((sponsor) => (
                <div key={sponsor.id} className="p-3 bg-white rounded border">
                  <p className="font-medium">{sponsor.name}</p>
                  <p className="text-sm text-gray-600 line-clamp-1">{sponsor.description}</p>
                  <a 
                    href={sponsor.application_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline block truncate"
                  >
                    Application Link
                  </a>
                  <p className="text-xs text-gray-500">
                    {sponsor.created_at ? new Date(sponsor.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recent Jobs</h3>
            <div className="space-y-2">
              {reportData.recentJobs.map((job) => (
                <div key={job.id} className="p-3 bg-white rounded border">
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-600">{job.role}</p>
                  <a 
                    href={job.application_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline block truncate"
                  >
                    Application Link
                  </a>
                  <p className="text-xs text-gray-500">
                    {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>© {new Date().getFullYear()} Ebrahim</p>
          <p className="mt-1">All Rights Reserved</p>
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
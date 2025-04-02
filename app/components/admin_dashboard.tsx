"use client";
import { useState, useEffect, FC } from "react";
import { FiBell, FiBriefcase, FiDollarSign, FiFileText, FiUser } from "react-icons/fi";
import Sidebar from "./sidebar";
import PostJob from "./admin-jobs";
import JobList from "./job-list";
import PostSponsor from "./admin-sponsors";
import SponsorList from "./sponsor-list";
import StudentList from "./students-list";
import Analytics from "./analytics";
import Reports from "./reports";

interface DashboardSectionProps {
  setSelectedSection: (section: string) => void;
  stats: {
    totalJobs: number;
    totalSponsors: number;
    totalStudents: number;
  };
  activities: {
    id: number;
    description: string;
    timestamp: string;
  }[];
  loading: boolean;
}

const AdminDashboard: FC = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [notifications, setNotifications] = useState(0);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalSponsors: 0,
    totalStudents: 0
  });
  const [activities, setActivities] = useState<{
    id: number;
    description: string;
    timestamp: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const [jobsRes, sponsorsRes, studentsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sponsor`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/student/all`)
        ]);

        const jobsData = await jobsRes.json();
        const sponsorsData = await sponsorsRes.json();
        const studentsData = await studentsRes.json();

        setStats({
          totalJobs: jobsData.data?.length || 0,
          totalSponsors: sponsorsData.data?.length || 0,
          totalStudents: studentsData.data?.length || 0
        });

        // Mock activities - replace with actual API call if available
        setActivities([
          {
            id: 1,
            description: "New student registration",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            description: "New job posting added",
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            description: "New sponsor registered",
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
          }
        ]);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedSection === "dashboard") {
      fetchDashboardData();
    }
  }, [selectedSection]);

  const renderSection = (section: string) => {
    switch (section) {
      case "dashboard":
        return (
          <DashboardSection 
            setSelectedSection={setSelectedSection} 
            stats={stats}
            activities={activities}
            loading={loading}
          />
        );
      case "jobs":
        return <JobsSection />;
      case "sponsors":
        return <SponsorsSection />;
      case "students":
        return <StudentsSection />;
      case "analytics":
        return <Analytics />;
      case "reports":
        return <Reports />;
      default:
        return (
          <DashboardSection 
            setSelectedSection={setSelectedSection} 
            stats={stats}
            activities={activities}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        selectedSection={selectedSection} 
        setSelectedSection={setSelectedSection} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setNotifications(0)}
            >
              <FiBell className="text-gray-600" size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                A
              </div>
              <span className="ml-2 text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {renderSection(selectedSection)}
          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Section
const DashboardSection: FC<DashboardSectionProps> = ({ 
  setSelectedSection, 
  stats, 
  activities,
  loading 
}) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        <>
          <StatCard title="Total Jobs" value={stats.totalJobs.toString()} />
          <StatCard title="Total Sponsors" value={stats.totalSponsors.toString()} />
          <StatCard title="Total Students" value={stats.totalStudents.toString()} />
        </>
      )}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Recent Activity">
        {loading ? (
          <ActivitySkeleton />
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-4">
                  <FiUser />
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card title="Quick Actions">
        <div className="space-y-3">
          <button 
            className="w-full flex items-center p-3 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSelectedSection('jobs')}
          >
            <FiBriefcase className="mr-3" />
            Post New Job
          </button>
          <button 
            className="w-full flex items-center p-3 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSelectedSection('sponsors')}
          >
            <FiDollarSign className="mr-3" />
            Add Sponsor
          </button>
          <button 
            className="w-full flex items-center p-3 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSelectedSection('reports')}
          >
            <FiFileText className="mr-3" />
            Generate Report
          </button>
        </div>
      </Card>
    </div>
  </div>
);

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
  </div>
);

const ActivitySkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 mr-4"></div>
        <div className="flex-1">
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// Other sections remain unchanged
const JobsSection: FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card title="Post a Job">
      <PostJob />
    </Card>
    <Card title="Job Listings">
      <JobList />
    </Card>
  </div>
);

const SponsorsSection: FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card title="Add a Sponsor">
      <PostSponsor />
    </Card>
    <Card title="Sponsors">
      <SponsorList />
    </Card>
  </div>
);

const StudentsSection: FC = () => (
  <Card title="Registered Students">
    <StudentList />
  </Card>
);

// Reusable Components
const Card: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const StatCard: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold mt-2 text-gray-700">{value}</p>
  </div>
);

export default AdminDashboard;
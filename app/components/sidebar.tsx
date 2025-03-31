"use client";
import { FC } from "react";
import { 
  FiHome, 
  FiBriefcase, 
  FiDollarSign, 
  FiUser, 
  FiBarChart2, 
  FiFileText,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-indigo-700 text-white">
      <div className="p-6 border-b border-indigo-600">
        <h1 className="text-xl font-bold text-white">Admin Portal</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem 
          icon={<FiHome size={18} className="text-indigo-200" />}
          label="Dashboard"
          active={selectedSection === 'dashboard'}
          onClick={() => setSelectedSection('dashboard')}
        />
        <SidebarItem 
          icon={<FiBriefcase size={18} className="text-indigo-200" />}
          label="Jobs"
          active={selectedSection === 'jobs'}
          onClick={() => setSelectedSection('jobs')}
        />
        <SidebarItem 
          icon={<FiDollarSign size={18} className="text-indigo-200" />}
          label="Sponsors"
          active={selectedSection === 'sponsors'}
          onClick={() => setSelectedSection('sponsors')}
        />
        <SidebarItem 
          icon={<FiUser size={18} className="text-indigo-200" />}
          label="Students"
          active={selectedSection === 'students'}
          onClick={() => setSelectedSection('students')}
        />
        <SidebarItem 
          icon={<FiBarChart2 size={18} className="text-indigo-200" />}
          label="Analytics"
          active={selectedSection === 'analytics'}
          onClick={() => setSelectedSection('analytics')}
        />
        <SidebarItem 
          icon={<FiFileText size={18} className="text-indigo-200" />}
          label="Reports"
          active={selectedSection === 'reports'}
          onClick={() => setSelectedSection('reports')}
        />
      </nav>
      <div className="p-4 border-t border-indigo-600 space-y-2">
        <SidebarItem 
          icon={<FiSettings size={18} className="text-indigo-200" />}
          label="Settings"
          onClick={() => {}}
        />
        <SidebarItem 
          icon={<FiLogOut size={18} className="text-indigo-200" />}
          label="Logout"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
      active 
        ? 'bg-indigo-600 text-white font-medium shadow-md' 
        : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
    {active && (
      <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
    )}
  </button>
);

export default Sidebar;
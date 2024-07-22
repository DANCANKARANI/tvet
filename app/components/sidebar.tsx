// components/Sidebar.tsx
import { FC, useState } from 'react';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelect }) => {
  const [active, setActive] = useState('jobs');

  const handleSelect = (section: string) => {
    setActive(section);
    onSelect(section);
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li
          className={`p-2 cursor-pointer ${active === 'jobs' ? 'bg-gray-700' : ''}`}
          onClick={() => handleSelect('jobs')}
        >
          Post Jobs
        </li>
        <li
          className={`p-2 cursor-pointer ${active === 'courses' ? 'bg-gray-700' : ''}`}
          onClick={() => handleSelect('courses')}
        >
          Post Courses
        </li>
        <li
          className={`p-2 cursor-pointer ${active === 'students' ? 'bg-gray-700' : ''}`}
          onClick={() => handleSelect('students')}
        >
          Get All Students
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

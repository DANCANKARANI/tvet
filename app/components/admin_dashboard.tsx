// pages/admin-dashboard.tsx
"use client"
import { useState, FC } from 'react';
import Sidebar from './sidebar';
import Student from './student';
import PostJob from './admin-jobs';
import JobList from './job-list';

const AdminDashboard: FC = () => {
  const [selectedSection, setSelectedSection] = useState('jobs');

  const renderSection = () => {
    switch (selectedSection) {
      case 'jobs':
        return <JobsSection />;
      case 'courses':
        return <CoursesSection />;
      case 'students':
        return <StudentsSection />;
      default:
        return <JobsSection />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedSection} />
      <div className="flex-1 p-4">{renderSection()}</div>
    </div>
  );
};

const JobsSection: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Post Jobs</h2>
        <PostJob />
      </div>
      <div className="w-1/2 p-4">
        <JobList />
      </div>
    </div>
  );
};

const CoursesSection: FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post Courses</h2>
      {/* Add form or functionality for posting courses here */}
    </div>
  );
};

const StudentsSection: FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Get All Students</h2>
      <Student/>
    </div>
  );
};

export default AdminDashboard;

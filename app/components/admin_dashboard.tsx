// pages/admin-dashboard.tsx
"use client"
import { useState, FC } from 'react';
import Sidebar from './sidebar';
import PostJob from './admin-jobs';
import JobList from './job-list';
import PostSponsor from './admin-sponsors';
import SponsorList from './sponsor-list';
import StudentList from './students-list';


const AdminDashboard: FC = () => {
  const [selectedSection, setSelectedSection] = useState('jobs');

  const renderSection = () => {
    switch (selectedSection) {
      case 'jobs':
        return <JobsSection />;
      case 'sponsors':
        return <SponsorsSection />;
      case 'students':
        return <StudentsSection />;
      default:
        return <JobsSection />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar onSelect={setSelectedSection} />
      <div className="flex-1 p-4">{renderSection()}</div>
    </div>
  );
};

const JobsSection: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Post Job</h2>
        <PostJob />
      </div>
      <div className="w-1/2 p-4">
        <JobList />
      </div>
    </div>
  );
};

const SponsorsSection: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Post Sponsor</h2>
        <PostSponsor />
      </div>
      <div className="w-1/2 p-4">
        <SponsorList />
      </div>
    </div>
  );
};

const StudentsSection: FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Get All Students</h2>
      <StudentList />
    </div>
  );
};

export default AdminDashboard;

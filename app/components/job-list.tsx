// components/JobList.tsx
"use client"
import { FC, useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Job {
  id: string;
  title: string;
  role: string;
  application_link: string;
}

const JobList: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/job');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data.data);
        console.log(data);
      } catch (error) {
        setErrorMessage("" + error);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log(`Edit job with id: ${id}`);
  };

  const handleDelete = async (id: string) => {
    // Handle delete logic here
    try {
        // Simulate form submission to an API
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/job/{id}', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to deletejob');
        }
      } catch (error) {
        setErrorMessage("error:"+error);
      }
    console.log(`Delete job with id: ${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Existing Jobs</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p><strong>Role:</strong> {job.role}</p>
                <p className='break-words'><strong>Application Link:</strong> 
                <a 
                href={job.application_link} 
                className="text-blue-500 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {job.application_link}
              </a>
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(job.id)}
                  className="text-blue-200 hover:text-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;

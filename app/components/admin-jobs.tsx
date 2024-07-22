// components/PostJob.tsx
import { useState } from 'react';

const PostJob = () => {
  const [Title, setJobTitle] = useState('');
  const [role, setRole] = useState('');
  const [application_link, setApplicationLink] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate form submission to an API
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Title, role, application_link }),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      setSuccessMessage('Job posted successfully!');
      setJobTitle('');
      setRole('');
      setApplicationLink('');
    } catch (error) {
      setErrorMessage("error:"+error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Post Job</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setJobTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Application Link</label>
          <input
            type="url"
            value={application_link}
            onChange={(e) => setApplicationLink(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;

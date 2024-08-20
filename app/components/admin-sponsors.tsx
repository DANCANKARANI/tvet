// components/PostJob.tsx
import { useState } from 'react';

const PostSponsor = () => {
  const [name, setSponsorName] = useState('');
  const [role, setRole] = useState('');
  const [application_link, setApplicationLink] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate form submission to an API
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role, application_link }),
      });

      if (!response.ok) {
        throw new Error('Failed to post sponsor');
      }

      setSuccessMessage('sponsor posted successfully!');
      setSponsorName('');
      setRole('');
      setApplicationLink('');
    } catch (error) {
      setErrorMessage("error:"+error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Post Sponsor</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setSponsorName(e.target.value)}
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
            Post Sponsor
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostSponsor;

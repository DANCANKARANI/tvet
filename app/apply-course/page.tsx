"use client"
import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ApplyCoursePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseLevel, setCourseLevel] = useState<'artisan' | 'certificate' | 'diploma' | ''>('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCourseLevelChange = (level: 'artisan' | 'certificate' | 'diploma') => {
    setCourseLevel(level);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Simulate form submission logic here
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Course Name: ${courseName}`);
    console.log(`Course Level: ${courseLevel}`);

    // Clear form fields
    setName('');
    setEmail('');
    setCourseName('');
    setCourseLevel('');

    // Display success message
    setSuccessMessage('Your application has been submitted successfully!');
  };

  return (
    <div>
      <Navbar name={''} />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex-grow mt-40">
        <h1 className="text-2xl font-bold mb-6">Apply for a Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter the course name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Select Course Level</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleCourseLevelChange('artisan')}
                className={`py-2 px-4 rounded-md border ${courseLevel === 'artisan' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Artisan
              </button>
              <button
                type="button"
                onClick={() => handleCourseLevelChange('certificate')}
                className={`py-2 px-4 rounded-md border ${courseLevel === 'certificate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Certificate
              </button>
              <button
                type="button"
                onClick={() => handleCourseLevelChange('diploma')}
                className={`py-2 px-4 rounded-md border ${courseLevel === 'diploma' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Diploma
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!courseLevel}
          >
            Submit
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

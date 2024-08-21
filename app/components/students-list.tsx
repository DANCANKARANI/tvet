// components/StudentList.tsx
"use client"
import { FC, useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

const StudentList: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student/all');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          throw new Error(data.error);
        }
        console.log(data);
      } catch (error) {
        setErrorMessage(`Error: ${error}`);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log(`Edit student with id: ${id}`);
  };

  const handleDelete = async (id: string) => {
    // Handle delete logic here
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/v1/student/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error}`);
    }
    console.log(`Delete student with id: ${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Existing Students</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {students.length > 0 ? (
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student.id} className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{student.fullName}</h3>
                <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(student.id)}
                  className="text-blue-200 hover:text-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDelete(student.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default StudentList;

// components/Student.tsx
"use state"
import { useEffect, useState } from 'react';

interface Student {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const Student = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        console.log(data)
        setStudents(data);
        setLoading(false);
      } catch (error) {
       console.log(error)
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      
     
   
    </div>
  );
};

export default Student;

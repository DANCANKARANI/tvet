"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Main from "../components/main";

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
}

export default function Page() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const authToken = Cookies.get("auth_token");
        console.log("JWT Token:", authToken);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/student`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Failed to fetch student: ${response.status}`);
        }

        // Check if data.data exists (your response is wrapped in a data property)
        if (data.data && data.data.full_name) {
          setStudent(data.data); // Use data.data to access the student object
        } else {
          throw new Error("Student data format invalid");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={student?.full_name || "Guest"} />
      <main className="flex-grow mt-40">
        <Main />
      </main>
      <Footer />
    </div>
  );
}
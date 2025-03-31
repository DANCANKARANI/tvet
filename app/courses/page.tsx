"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Course from "../components/course";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("Guest");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/course`);
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    async function fetchStudentName() {
      try {
        const authToken = Cookies.get("auth_token");
        if (!authToken) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/student`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok && data.data?.full_name) {
          setStudentName(data.data.full_name);
        }
      } catch (error) {
        console.error("Error fetching student name:", error);
      }
    }

    fetchData();
    fetchStudentName();
  }, []);

  const handleApplyCourse = () => {
    router.push("/apply-course");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar name={studentName} />
      <main className="flex-grow px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-4">
            <div>Level</div>
            <div>Course Name</div>
            <div>KCSE Grade</div>
          </div>
          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course: { id: number; level: string; course_name: string; kcse_grade: string }) => (
                <Course key={course.id} Level={course.level} CourseName={course.course_name} KcseGrade={course.kcse_grade} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No courses available at the moment.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={handleApplyCourse} className="py-3 px-6 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700">
            Apply for a Course
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

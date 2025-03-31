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
    <div className="flex flex-col min-h-screen bg-blue-500">
      <Navbar name={studentName} />
      <main className="flex-grow mt-40">
        <section className="section flex p-20px text-20">
          <div className="header-item">Level</div>
          <div className="header-item">Course name</div>
          <div className="header-item">KCSE Grade</div>
        </section>
        {courses.map((course: { id: number; level: string; course_name: string; kcse_grade: string }) => (
          <Course key={course.id} Level={course.level} CourseName={course.course_name} KcseGrade={course.kcse_grade} />
        ))}
        <div className="flex justify-center mt-8">
          <button onClick={handleApplyCourse} className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600">
            Apply Course
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

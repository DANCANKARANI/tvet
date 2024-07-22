"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Course from "../components/course";
import Footer from "../components/footer";

export default function Courses(){
    const [Courses, setCourses] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/course'); // Replace with your API endpoint
                const data = await response.json();
                setCourses(data.data); // Assuming the data array is directly under data.data
                console.log(data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-blue-500">
            <div><Navbar name={"Idris"}/></div>
            <main className="flex-grow mt-40">
            <section className="section flex  p-20px text-20">
            <div className="header-item">Level</div>
            <div className="header-item">Course name</div>
            <div className="header-item">KCSE Grade</div>
        </section>
            {Courses.map((course: { id: number, level: string, course_name: string, kcse_grade: string }) => (
                <Course 
                    key={course.id}
                    Level={course.level}
                    CourseName={course.course_name}
                    KcseGrade={course.kcse_grade}
                />
                ))}
            </main>
            <div><Footer/></div>
        </div>
    );
}

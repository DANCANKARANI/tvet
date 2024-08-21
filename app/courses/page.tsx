"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Course from "../components/course";
import Footer from "../components/footer";
import { useRouter } from 'next/navigation';

export default function Courses(){
    const [Courses, setCourses] = useState([]);
    const router = useRouter();  // Router for navigating to the applying course page

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/course');
                const data = await response.json();
                setCourses(data.data);
                console.log(data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleApplyCourse = () => {
        router.push('/apply-course');  // Navigate to applying course page
    };

    return (
        <div className="flex flex-col min-h-screen bg-blue-500">
            <Navbar name={"Idris"} />
            <main className="flex-grow mt-40">
                <section className="section flex p-20px text-20">
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
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleApplyCourse}
                        className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Apply Course
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

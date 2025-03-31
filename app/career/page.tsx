"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Job from "../components/job";

export default function Career() {
  const [jobs, setJobs] = useState([]);
  const [studentName, setStudentName] = useState("Guest");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job`);
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
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

    fetchJobs();
    fetchStudentName();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={studentName} />
      <main className="flex-grow mt-40">
        <section className="section flex p-20px text-20">
          <div className="header-item">Title</div>
          <div className="header-item">Role</div>
          <div className="header-item">Application</div>
        </section>
        {jobs.map((job: { id: number; title: string; role: string; application_link: string }) => (
          <Job key={job.id} title={job.title} role={job.role} application={job.application_link} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

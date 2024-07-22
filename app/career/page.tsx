"use client"
import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Job from "../components/job";

export default function Career() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/job'); // Replace with your API endpoint
                const data = await response.json();
                setJobs(data.data); // Assuming the data array is directly under data.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div><Navbar name={"Ayan"}/></div>
            <main className="flex-grow mt-40">
            <section className="section flex  p-20px text-20">
            <div className="header-item">Title</div>
            <div className="header-item">Role</div>
            <div className="header-item">Application</div>
        </section>
            {jobs.map((job: { id: number, title: string, role: string, application_link: string }) => (
                <Job
                    key={job.id}
                    title={job.title}
                    role={job.role}
                    application={job.application_link}
                />
                ))}
            </main>
            <div><Footer/></div>
        </div>
    );
}

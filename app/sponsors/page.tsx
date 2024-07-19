"use client"
import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sponsor from '../components/sponsor';

export default function Sponsors() {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sponsor'); // Replace with your API endpoint
                const data = await response.json();
                console.log(data.data)
                setSponsors(data.data); // Assuming the data array is directly under data.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div><Navbar name={"karani"}/></div>
            <main className="flex-grow mt-40">
            <section className="section flex  p-20px text-20">
            <div className="header-item">Name</div>
            <div className="header-item">Description</div>
            <div className="header-item">Application link</div>
        </section>
            {sponsors.map((job: { id: number, name: string, descrption: string, application_link: string }) => (
                <Sponsor
                    key={job.id}
                    name={job.name}
                    description={job.descrption}
                    application={job.application_link}
                />
                ))}
            </main>
            <div><Footer/></div>
        </div>
    );
}

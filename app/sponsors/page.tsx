"use client"
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sponsor from '../components/sponsor';
import { useRouter } from 'next/navigation';

export default function Sponsors() {
    const [sponsors, setSponsors] = useState([]);
    const [studentName, setStudentName] = useState("Guest");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sponsor');
                const data = await response.json();
                setSponsors(data.data);
            } catch (error) {
                console.error('Error fetching sponsors:', error);
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
                console.error('Error fetching student name:', error);
            }
        }

        fetchData();
        fetchStudentName();
    }, []);

    const handleApplySponsor = () => {
        router.push("/apply-sponsor");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar name={studentName} />
            <main className="flex-grow px-6 py-12 mt-16"> {/* Added mt-16 instead of multiple br tags */}
                <h1 className="text-3xl font-bold text-center mb-8">Available Sponsors</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Header row */}
                    <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2 mb-4">
                        <div className="p-2">Name</div>
                        <div className="p-2">Description</div>
                        <div className="p-2">Application Link</div>
                    </div>
                    
                    {/* Sponsor items */}
                    {sponsors.length > 0 ? (
                        <div className="space-y-4">
                            {sponsors.map((sponsor: { 
                                id: number, 
                                name: string, 
                                description: string, 
                                application_link: string 
                            }) => (
                                <div key={sponsor.id} className="grid grid-cols-3 gap-4 items-center">
                                    <div className="p-2">{sponsor.name}</div>
                                    <div className="p-2">{sponsor.description}</div>
                                    <div className="p-2">
                                        <a 
                                            href={sponsor.application_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Apply Here
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No sponsors available at the moment.</p>
                    )}
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleApplySponsor} 
                        className="py-3 px-6 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Apply for Sponsorship
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
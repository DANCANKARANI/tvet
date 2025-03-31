"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ContactUs() {
  const [studentName, setStudentName] = useState("Guest");

  useEffect(() => {
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

    fetchStudentName();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={studentName} />
      <main className="flex-grow mt-40">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

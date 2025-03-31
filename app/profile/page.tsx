"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

interface UserData {
  full_name: string;
  email: string;
  phone_number: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const authToken = Cookies.get("auth_token");
        if (!authToken) {
          router.push('/login');
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/student`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        if (data.data) {
          setUser({
            full_name: data.data.full_name,
            email: data.data.email,
            phone_number: data.data.phone_number
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar name={"Loading..."} />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar name={"Error"} />
        <main className="flex-grow flex items-center justify-center text-red-500">
          {error}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={user?.full_name || "Guest"} />
      <br />
      <br />
      <main className="flex-grow flex flex-col items-center justify-center mt-20">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center">
                <strong className="w-28">Name:</strong>
                <span>{user.full_name}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-28">Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-28">Phone:</strong>
                <span>{user.phone_number || 'Not provided'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 w-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
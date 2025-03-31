"use client";
import { FC, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const TrackPaymentPage: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "bank" | "">("");
  const [paymentCode, setPaymentCode] = useState("");
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

  const handlePaymentMethodChange = (method: "mpesa" | "bank") => {
    setPaymentMethod(method);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Payment Method: ${paymentMethod}`);
    console.log(`Payment Code: ${paymentCode}`);

    // Clear form fields
    setPaymentMethod("");
    setPaymentCode("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={studentName} />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex-grow mt-40">
        <h1 className="text-2xl font-bold mb-6">Track Payment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Select Payment Method</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("mpesa")}
                className={`py-2 px-4 rounded-md border ${
                  paymentMethod === "mpesa" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                MPESA
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("bank")}
                className={`py-2 px-4 rounded-md border ${
                  paymentMethod === "bank" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                Bank
              </button>
            </div>
          </div>
          {paymentMethod && (
            <div>
              <label className="block text-lg font-medium mb-2">Payment Code</label>
              <input
                type="text"
                value={paymentCode}
                onChange={(e) => setPaymentCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your payment code"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!paymentMethod}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default TrackPaymentPage;

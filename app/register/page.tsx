"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);
  
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, full_name, phone_number, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        if (data.success === "false") {
          setError(data.error);
        } else {
          setSuccess(data.message || 'Registration successful! Redirecting...');
          setTimeout(() => router.push("/"), 2000);
        }
      } catch (error: unknown) {
        console.error('Error:', error);
        let errorMessage = 'Registration failed. Please try again.';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                    <input
                        type="text"
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                        required
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
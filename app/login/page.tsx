"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../globals.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'cookies-js';

const Login = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success === "false") {
        setError(data.error);
        return;
      }

      // Store the JWT token using cookies-js
      if (data.data?.token) {
        Cookies.set('auth_token', data.data.token);
        
        // Optionally store user data if needed
        Cookies.set('user_data', JSON.stringify({
          phone_number: phone_number,
          // Add other user data you want to store
        }), {
          expires: 30,
          path: '/'
        });
      }

      router.push("/home");
    } catch (error: unknown) {
      console.error('Error:', error);
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login page</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="form-group">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <div className="password-input-container relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border pr-10"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(prevState => !prevState)}
              className="password-toggle-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            />
          </div>
        </div>
        {error && <p className="error-message text-red-500 text-sm">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex items-center justify-center text-sm">
          <p className="text-gray-600">Don't have an account?</p>
          <Link href="/register" className="text-blue-600 hover:text-blue-800 ml-2 font-medium">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
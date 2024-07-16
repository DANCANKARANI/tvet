"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../globals.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log(phone_number,password);
      if (data.success=="false"){
        console.log(data.error, data);
        setError(data.error);
        console.log("sdda"+error)
      }else{
        setError(data.message);
        router.push("/home")
      }
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
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon"
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex flex-row items-center">
            <p>don't have account?</p>
            <Link href="/register" className="text-blue-500 ml-2">register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
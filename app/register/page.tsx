"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Register = () => {
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const[full_name,setFullName]=useState('');
    const[email,setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/student/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email,full_name,phone_number, password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData)
          throw new Error(errorData.message || 'Login failed');
        }
  
        const data = await response.json();
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
        <form onSubmit={handleRegister} className="signup-container">
            <h1 className="login-title">Registration page</h1>
            <div className="form-group">
                <label>Full Name:</label>
                <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
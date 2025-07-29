import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Register Page
    function Register() {
      const navigate = useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // API call: POST /api/register
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
          if (response.ok) {
            alert('OTP sent to your email');
            navigate('/dashboard');
          } else {
            alert('Registration failed');
          }
        } catch (error) {
          alert('Error: ' + error.message);
        }
      };
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" className="w-full p-2 border rounded focus:ring focus:ring-blue-200" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" className="w-full p-2 border rounded focus:ring focus:ring-blue-200" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="password" className="w-full p-2 border rounded focus:ring focus:ring-blue-200" required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                Register
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      );
    }
    
    export default Register;
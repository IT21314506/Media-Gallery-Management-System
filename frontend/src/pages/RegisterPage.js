import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function RegisterPage() {
  const [step, setStep] = useState(1); // 1: Register form, 2: OTP verification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      // For testing, backend returns OTP; in production, OTP is sent via email
      console.log('OTP for testing:', res.data.otp);
      setStep(2); // Move to OTP verification
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        name,
        email,
        password,
        otp,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {step === 1 ? 'Register' : 'Verify OTP'}
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {step === 1 ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 w-full rounded-md hover:bg-blue-600"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 w-full rounded-md hover:bg-blue-600"
          >
            Verify OTP
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-blue-500 underline mt-2"
          >
            Back to Register
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-2">Or register with Google</p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError('Google login failed')}
        />
      </div>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
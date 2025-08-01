import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
      <div className="mt-4">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log('Google Login Failed')} />
      </div>
    </div>
  );
}

export default LoginPage;
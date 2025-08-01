import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState({ name: '', role: '' });
  const [stats, setStats] = useState({ totalUploads: 0, recentUploads: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await axios.get('http://localhost:5000/api/auth/verify', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser({ name: userRes.data.name || 'User', role: userRes.data.role });

        // Fetch media stats
        const mediaRes = await axios.get('http://localhost:5000/api/media', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats({
          totalUploads: mediaRes.data.length,
          recentUploads: mediaRes.data.slice(0, 5), // Last 5 uploads
        });
        setError('');
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Uploads</h3>
          <p className="text-2xl">{stats.totalUploads}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Recent Uploads</h3>
          <p className="text-2xl">{stats.recentUploads.length}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/gallery"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
        >
          View Media Gallery
        </Link>
        <Link
          to="/upload"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
        >
          Upload Image
        </Link>
        <Link
          to="/contact"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
        >
          Contact Us
        </Link>
        <Link
          to="/profile"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
        >
          User Profile
        </Link>
        {user.role === 'admin' && (
          <>
            <Link
              to="/admin/users"
              className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/contact"
              className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600"
            >
              View Contact Messages
            </Link>
          </>
        )}
      </div>

      {/* Recent Uploads */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Uploads</h3>
        {stats.recentUploads.length === 0 ? (
          <p className="text-gray-600">No uploads yet. Start by uploading an image!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.recentUploads.map((item) => (
              <div key={item._id} className="border rounded-lg p-2 shadow">
                <Link to={`/image/${item._id}`}>
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded"
                  />
                </Link>
                <p className="mt-2 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
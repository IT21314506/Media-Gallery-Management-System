import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error.response?.data?.message || 'Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = async (id, data) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/users/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.map((user) => (user._id === id ? res.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error(error.response?.data?.message || 'Error updating user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="border rounded p-4 flex justify-between">
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingUser && (
        <EditUser
          user={editingUser}
          onSave={handleEdit}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}

function EditUser({ user, onSave, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user._id, { name, email, role });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-firstChild:">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full rounded"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUserManagement;
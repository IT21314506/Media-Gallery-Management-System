import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    // Here you can add logic to save the updated user data (e.g., API call)
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <div className="flex justify-center mb-4">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
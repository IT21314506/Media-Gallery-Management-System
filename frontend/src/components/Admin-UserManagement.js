import React from "react";

function UserManagement() {
  const handleDelete = async (id) => {
    // API call: DELETE /api/users/:id
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      alert(`Deleted user ${id}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((id) => (
            <tr key={id}>
              <td className="p-2 border">User {id}</td>
              <td className="p-2 border">user{id}@example.com</td>
              <td className="p-2 border">User</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
    
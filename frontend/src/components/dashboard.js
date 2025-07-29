import React from "react";
import { Link } from "react-router-dom";

    // Dashboard
    function Dashboard() {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700">Media Stats</h2>
                        <p>Total Images: 50</p>
                        <p>Storage Used: 1.2 GB</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700">Recent Uploads</h2>
                        <ul>
                            <li>image1.jpg - 2 days ago</li>
                            <li>image2.png - 3 days ago</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
                        <p>Name: John Doe</p>
                        <p>Email: john@example.com</p>
                        <Link to="/profile" className="text-blue-600 hover:underline">Edit Profile</Link>
                    </div>
                </div>
            </div>
        );
    }

    export default Dashboard;
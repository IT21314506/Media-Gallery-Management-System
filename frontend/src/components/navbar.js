import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex space-x-6 justify-center text-white">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
                <li><Link to="/upload" className="hover:underline">Upload</Link></li>
                <li><Link to="/zip-download" className="hover:underline">ZIP Download</Link></li>
                <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                <li><Link to="/admin/users" className="hover:underline">Admin: Users</Link></li>
                <li><Link to="/admin/messages" className="hover:underline">Admin: Messages</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
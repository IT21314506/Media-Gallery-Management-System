import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
                <p className="mb-4 text-gray-600">The page you're looking for doesn't exist or you don't have access.</p>
                <Link to="/" className="text-blue-600 hover:underline">Go to Home</Link>
            </div>
        </div>
    );
}

export default NotFound;
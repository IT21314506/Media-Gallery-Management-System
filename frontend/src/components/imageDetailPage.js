import React from "react";

function ImageDetail() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Image Details</h1>
            <img
                src="https://via.placeholder.com/600"
                alt="media"
                className="w-full max-w-3xl mx-auto rounded"
            />
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-700">Metadata</h2>
                <p>File Name: image1.jpg</p>
                <p>Size: 1.2 MB</p>
                <p>Uploaded: 2025-07-28</p>
            </div>
        </div>
    );
}

export default ImageDetail;
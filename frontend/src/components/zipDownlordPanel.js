import React from 'react';

function ZipDownload() {
    const handleDownload = async () => {
        try {
            const response = await fetch('/api/media/zip');
            if (!response.ok) {
                throw new Error('Failed to download ZIP file');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'media.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Download Media as ZIP</h1>
            <p className="mb-4">Select media to download as a ZIP file.</p>
            <button
                onClick={handleDownload}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                Download Selected
            </button>
        </div>
    );
}

export default ZipDownload;
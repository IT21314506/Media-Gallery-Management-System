import React from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload() {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                alert('No file selected');
                return;
            }
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            try {
                const response = await fetch('/api/media/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                alert('Image uploaded');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        },
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Image</h1>
            <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-lg text-center ${
                    isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
            >
                <input {...getInputProps()} />
                <p className="text-gray-600">
                    {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                </p>
            </div>
        </div>
    );
}

export default ImageUpload;
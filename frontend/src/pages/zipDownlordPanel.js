import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const zipDownloadPanel = () => {
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    // Example: Add sample files to the ZIP
    zip.file('sample1.txt', 'This is the content of sample file 1.');
    zip.file('sample2.txt', 'This is the content of sample file 2.');

    // Generate the ZIP file
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'downloaded_files.zip');
    } catch (error) {
      console.error('Error generating ZIP file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Download Files as ZIP</h2>
        <div className="flex justify-center">
          <button
            onClick={handleDownloadZip}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download ZIP
          </button>
        </div>
      </div>
    </div>
  );
};

export default zipDownloadPanel;

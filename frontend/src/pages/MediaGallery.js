import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
//import EditMedia from './EditMedia'; // Uncomment and use this if you have an EditMedia component

function MediaGallery() {
  const [error, setError] = useState('');
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [galleryType, setGalleryType] = useState('personal');
  const [editingMedia, setEditingMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/media?galleryType=${galleryType}&query=${search}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setMedia(res.data);
      } catch (error) {
        console.error(error.response?.data?.message || 'Error fetching media');
      }
    };

    fetchMedia();
  }, [galleryType, search]);

  const handleSelect = (id) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((mediaId) => mediaId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/media/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMedia((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || 'Error deleting media');
    }
  };

  const handleDownloadZip = async () => {
    if (selectedMedia.length === 0) {
      setError('Please select at least one image');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:5000/api/media/zip',
        { mediaIds: selectedMedia },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          responseType: 'blob',
        }
      );
      const blob = new Blob([res.data], { type: 'application/zip' });
      saveAs(blob, 'media.zip');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error downloading ZIP');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Media Gallery</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or tags"
          className="border p-2 rounded flex-grow"
        />
        <select
          value={galleryType}
          onChange={(e) => setGalleryType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="personal">Personal</option>
          <option value="shared">Shared</option>
        </select>
      </div>

      <button
        onClick={handleDownloadZip}
        disabled={selectedMedia.length === 0}
        className={`bg-blue-500 text-white p-2 rounded mb-4 ${
          selectedMedia.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Download {selectedMedia.length} Selected as ZIP
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item._id} className="border rounded p-2">
            <Link to={`/image/${item._id}`}>
              <img
                src={item.fileUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
            </Link>
            <h3 className="text-lg mt-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-600">Tags: {item.tags.join(', ')}</p>

            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMedia.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                />
                <span>Select</span>
              </label>

              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditingMedia(item._id)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Placeholder for edit panel - requires real EditMedia component */}
            {editingMedia === item._id && (
              <div className="mt-2 p-2 border bg-gray-100 text-sm text-gray-800">
                {/* Replace below with actual EditMedia component if available */}
                Editing media ID: {item._id}
                <button
                  onClick={() => setEditingMedia(null)}
                  className="ml-2 text-blue-500 underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaGallery;

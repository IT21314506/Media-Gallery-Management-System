import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditMedia({ mediaId, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [galleryType, setGalleryType] = useState('personal');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/media/${mediaId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const { title, description, tags, galleryType } = res.data;
        setTitle(title);
        setDescription(description);
        setTags(tags.join(','));
        setGalleryType(galleryType);
      } catch (error) {
        console.error(error.response?.data?.message || 'Error fetching media');
      }
    };
    fetchMedia();
  }, [mediaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('galleryType', galleryType);
    if (file) formData.append('file', file);

    try {
      await axios.put(`http://localhost:5000/api/media/${mediaId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Media updated');
      navigate('/gallery');
    } catch (error) {
      console.error(error.response?.data?.message || 'Error updating media');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Media</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="border p-2 w-full rounded"
          />
          <select
            value={galleryType}
            onChange={(e) => setGalleryType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="personal">Personal</option>
            <option value="shared">Shared</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMedia;
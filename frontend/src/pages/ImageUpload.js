import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImageUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [galleryType, setGalleryType] = useState('personal');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      setFile(file);
    },
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('galleryType', galleryType);

    try {
      await axios.post('http://localhost:5000/api/media/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully');
      navigate('/gallery');
    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-dashed border-2 p-6 rounded-lg text-center ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image (JPG/PNG, max 5MB), or click to select</p>
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded" />
          </div>
        )}
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
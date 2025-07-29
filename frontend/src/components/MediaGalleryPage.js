import React from 'react';
import { Link } from 'react-router-dom';

function MediaGallery() {
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('all');
    const [mediaList, setMediaList] = React.useState([]);

    React.useEffect(() => {
        // Fetch media list from API
        const fetchMedia = async () => {
            try {
                const res = await fetch('/api/media');
                const data = await res.json();
                setMediaList(data);
            } catch (error) {
                alert('Failed to load media: ' + error.message);
            }
        };
        fetchMedia();
    }, []);

    const handleSearch = (e) => setSearch(e.target.value);

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/media/${id}`, { method: 'DELETE' });
            setMediaList((prev) => prev.filter((item) => item.id !== id));
            alert(`Deleted media ${id}`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Filter and search logic
    const filteredMedia = mediaList.filter((item) => {
        const matchesSearch = item.title?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === 'all' ||
            (filter === 'images' && item.type === 'image') ||
            (filter === 'videos' && item.type === 'video');
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Media Gallery</h1>
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search media..."
                    value={search}
                    onChange={handleSearch}
                    className="p-2 border rounded w-full max-w-md focus:ring focus:ring-blue-200"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded focus:ring focus:ring-blue-200"
                >
                    <option value="all">All</option>
                    <option value="images">Images</option>
                    <option value="videos">Videos</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMedia.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">No media found.</div>
                ) : (
                    filteredMedia.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                            {item.type === 'image' ? (
                                <img
                                    src={item.url}
                                    alt={item.title || 'media'}
                                    className="w-full h-32 object-cover rounded"
                                />
                            ) : (
                                <video
                                    src={item.url}
                                    controls
                                    className="w-full h-32 object-cover rounded"
                                />
                            )}
                            <p className="mt-2">{item.title || `Media ${item.id}`}</p>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/media/${item.id}`} className="text-blue-600 hover:underline">
                                    View
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link
                to="/upload"
                className="mt-4 inline-block bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                Upload New Media
            </Link>
        </div>
    );
}

export default MediaGallery;
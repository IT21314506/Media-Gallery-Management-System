import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/media', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMediaList(res.data);
        const current = res.data.find((item) => item._id === id);
        setMedia(current);
        setCurrentIndex(res.data.findIndex((item) => item._id === id));
      } catch (error) {
        console.error(error.response?.data?.message || 'Error fetching media');
      }
    };
    fetchMedia();
  }, [id]);

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : mediaList.length - 1;
    navigate(`/image/${mediaList[prevIndex]._id}`);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < mediaList.length - 1 ? currentIndex + 1 : 0;
    navigate(`/image/${mediaList[nextIndex]._id}`);
  };

  if (!media) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 text-white text-2xl"
        >
          &larr;
        </button>
        <img
          src={media.fileUrl}
          alt={media.title}
          className="w-full h-screen object-contain"
        />
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 text-white text-2xl"
        >
          &rarr;
        </button>
        <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
          <h3 className="text-lg">{media.title}</h3>
          <p>{media.description}</p>
          <p>Tags: {media.tags.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;
import { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList({ isAdmin }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const endpoint = isAdmin ? '/admin/contact' : '/my-messages';
        const res = await axios.get(`http://localhost:5000/api/contact${endpoint}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMessages(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchMessages();
  }, [isAdmin]);

  const handleDelete = async (id) => {
    try {
      const endpoint = isAdmin ? `/admin/contact/${id}` : `/${id}`;
      await axios.delete(`http://localhost:5000/api/contact${endpoint}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg._id} className="border p-2 mb-2">
          <p>{msg.message}</p>
          {isAdmin && <p>User: {msg.userId?.name || 'Anonymous'}</p>}
          {!isAdmin && (
            <button onClick={() => handleDelete(msg._id)} className="bg-red-500 text-white p-1">
              Delete
            </button>
          )}
          {isAdmin && (
            <button onClick={() => handleDelete(msg._id)} className="bg-red-500 text-white p-1">
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
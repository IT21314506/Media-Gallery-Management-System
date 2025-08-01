import { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', { name, email, message }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Message sent');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
}

export default ContactForm;
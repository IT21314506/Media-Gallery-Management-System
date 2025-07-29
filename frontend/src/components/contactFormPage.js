import React from "react";

function ContactForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            if (!res.ok) throw new Error('Failed to send message');
            alert('Message sent');
            e.target.reset();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="p-2 border rounded w-full max-w-md focus:ring focus:ring-blue-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="p-2 border rounded w-full max-w-md focus:ring focus:ring-blue-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="p-2 border rounded w-full max-w-md focus:ring focus:ring-blue-200"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
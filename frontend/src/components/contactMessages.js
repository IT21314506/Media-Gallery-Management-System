import React, { useEffect, useState } from "react";

function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch messages from API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/contact");
                if (!res.ok) throw new Error("Failed to fetch messages");
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                alert("Error: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        try {
            const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete message");
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
            alert(`Deleted message ${id}`);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Message</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-2 border text-center text-gray-500">
                                No messages found.
                            </td>
                        </tr>
                    ) : (
                        messages.map((msg) => (
                            <tr key={msg.id}>
                                <td className="p-2 border">{msg.name}</td>
                                <td className="p-2 border">{msg.email}</td>
                                <td className="p-2 border">{msg.message}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ContactMessages;
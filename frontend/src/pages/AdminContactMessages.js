import MessageList from '../components/MessageList';
import React from 'react';

function AdminContactMessages() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Contact Messages</h2>
      <MessageList isAdmin={true} />
    </div>
  );
}

export default AdminContactMessages;
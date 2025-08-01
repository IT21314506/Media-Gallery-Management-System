import ContactForm from '../components/ContactForm';
import MessageList from '../components/MessageList';

function ContactPage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <ContactForm />
      <h3 className="text-xl font-bold mt-8 mb-4">Your Messages</h3>
      <MessageList isAdmin={false} />
    </div>
  );
}

export default ContactPage;
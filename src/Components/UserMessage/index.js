import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const UserMessage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const handleDeleteMsg = (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this message?");
    if (!isConfirmed) return; // Exit if user cancels

    fetch(`http://localhost:5000/messages/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setMessages(messages.filter((msg) => msg.id !== id));
        toast.success("Message deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message!");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((response) => response.json())
      .then((msg) => {
        setTimeout(() => {
          setMessages(msg);
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="flex flex-col items-center space-y-5 animate-fadeIn">
      <Toaster />
      {isLoading ? (
        <Spinner animation="border" style={{ color: "#e274a9" }} />
      ) : messages.length === 0 ? (
        <p className="text-gray-600 text-2xl">No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className="text-center border-2 shadow-md w-[50%] rounded-md border-[#e4b0c9] hover:shadow-xl duration-500 relative"
          >
            <h2 className="text-[#e274a9]">{msg.name}</h2>
            <p>{msg.email}</p>
            <p>{msg.message}</p>
            <p>{msg.date}</p>
            <X
              className="absolute top-2 right-2 border-1 border-red-600 rounded-2xl text-red-600 hover:text-white hover:bg-red-600 duration-500 cursor-pointer"
              onClick={() => handleDeleteMsg(msg.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default UserMessage;

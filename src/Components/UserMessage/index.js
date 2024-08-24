import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const UserMessage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
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
        console.error("Error fetching users:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
  <div className="flex flex-col items-center space-y-5">
  {isLoading ? <Spinner animation="border" style={{ color: "#e274a9" }} /> : (
    messages.map((msg) => (
      <div key={msg.id} className="text-center border-2 shadow-md w-[50%] rounded-md border-[#e4b0c9] hover:shadow-xl duration-500">
        <h2 className="text-[#e274a9]">{msg.name}</h2>
        <p>{msg.email}</p>
        <p>{msg.message}</p>
      </div>
    ))
  )}
  </div>);
};

export default UserMessage;

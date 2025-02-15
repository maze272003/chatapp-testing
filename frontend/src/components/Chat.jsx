import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("Iloilo");
  const [username] = useState("User"); // Default username

  useEffect(() => {
    fetchMessages();
  }, []);

  // Fetch Messages from Backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await axios.post("http://localhost:5000/messages", { message, location, username });
      setMessage("");
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-3">
        <h3 className="text-center">Chat Inbox</h3>

        {/* Select Location */}
        <div className="mb-3">
          <label>Select a Location:</label>
          <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="Iloilo">Iloilo</option>
            <option value="Cebu">Cebu</option>
            <option value="Manila">Manila</option>
          </select>
        </div>

        {/* Messages */}
        <div className="mb-3 border p-2" style={{ height: "200px", overflowY: "auto", background: "#f8f9fa" }}>
          {messages.map((msg, index) => (
            <div key={index} className="alert alert-info">
              <strong>{msg.username} ({msg.city}):</strong> {msg.message}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("Iloilo");
  const [tablesData, setTablesData] = useState({});

  useEffect(() => {
    fetchMessages();
    fetchAllTables();
  }, []);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      console.log("Fetched messages:", res.data);  // Debugging log
      setMessages(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Fetch all tables and their data
  const fetchAllTables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all-tables");
      setTablesData(res.data);
    } catch (error) {
      console.error("Fetch Tables Error:", error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/addMessage", {
        message,
        city: location,
      });

      console.log("Response:", res.data);
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Send Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chat Inbox</h2>

      <div className="card p-4 shadow-lg">
        <h3 className="text-center">Messages</h3>

        <div className="mb-2">
          <label className="form-label">Select a city:</label>
          <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="Iloilo">Iloilo</option>
            <option value="Cebu">Cebu</option>
            <option value="Davao">Davao</option>
          </select>
        </div>

        <div className="chat-box border rounded p-2 mb-3 bg-white" style={{ height: "200px", overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <div key={index} className="alert alert-info p-2">
              <strong>({msg.city}):</strong> {msg.message}
            </div>
          ))}
        </div>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Type your message..." value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>

      
    </div>
  );
}

export default App;

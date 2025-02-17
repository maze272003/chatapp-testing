import React, { useState, useEffect } from "react";
import axios from "axios";


function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("Iloilo");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post("http://localhost:5000/addMessage", {
        message,
        city: location,
      });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Send Error:", error);
    }
  };

  // Open Google Maps with the city's location
  const openGoogleMaps = (city) => {
    const cityEncoded = encodeURIComponent(city);
    window.open(`https://www.google.com/maps/search/?api=1&query=${cityEncoded}`, "_blank");
  };

  // All Philippine provinces and major cities
  const philippineLocations = [
    // Luzon
    "Abra", "Albay", "Apayao", "Aurora", "Bataan", "Batanes", "Batangas", "Benguet", "Bulacan",
    "Cagayan", "Camarines Norte", "Camarines Sur", "Catanduanes", "Cavite", "Ifugao", "Ilocos Norte",
    "Ilocos Sur", "Isabela", "Kalinga", "La Union", "Laguna", "Mountain Province", "Nueva Ecija",
    "Nueva Vizcaya", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga", "Pangasinan",
    "Quezon", "Quirino", "Rizal", "Romblon", "Sorsogon", "Tarlac", "Zambales",

    // Metro Manila (NCR)
    "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Manila", "Marikina", "Muntinlupa",
    "Navotas", "Parañaque", "Pasay", "Pasig", "Quezon City", "San Juan", "Taguig", "Valenzuela", "Pateros",

    // Visayas
    "Aklan", "Antique", "Biliran", "Bohol", "Capiz", "Cebu", "Eastern Samar", "Guimaras",
    "Iloilo", "Leyte", "Negros Occidental", "Negros Oriental", "Northern Samar", "Samar",
    "Southern Leyte", "Siquijor", "Western Samar",

    // Mindanao
    "Agusan del Norte", "Agusan del Sur", "Basilan", "Bukidnon", "Camiguin", "Compostela Valley",
    "Cotabato", "Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental",
    "Dinagat Islands", "Lanao del Norte", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur",
    "Misamis Occidental", "Misamis Oriental", "Sarangani", "South Cotabato", "Sultan Kudarat", "Sulu",
    "Surigao del Norte", "Surigao del Sur", "Tawi-Tawi", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay",

    // Highly Urbanized Cities
    "Baguio", "Butuan", "Cagayan de Oro", "Cotabato City", "Davao City", "General Santos", "Iligan",
    "Lapu-Lapu", "Mandaue", "Olongapo", "Puerto Princesa", "Tacloban", "Zamboanga City"
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chat Inbox</h2>

      <div className="card p-4 shadow-lg">
        <h3 className="text-center">Messages</h3>

        <div className="mb-2">
          <label className="form-label">Select a location:</label>
          <select
            className="form-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {philippineLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div
          className="chat-box border rounded p-2 mb-3 bg-white"
          style={{ height: "300px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div key={index} className="alert alert-info p-2">
              <strong>
                (<span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => openGoogleMaps(msg.city)}
                >
                  {msg.city}
                </span>
                ):
              </strong>{" "}
              {msg.message}
            </div>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

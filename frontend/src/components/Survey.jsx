import { useState } from "react";
import axios from "axios";

function Survey() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addSurvey", {
        name,
        feedback,
        rating,
      });
      console.log("Response:", response.data); // Debugging

      alert(`Salamat, ${name}, sa iyong feedback: "${feedback}" at rating: ${rating}`);
      setName("");
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("May error sa pagpapadala ng iyong feedback.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">Form ng Survey</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pangalan:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Ilagay ang iyong pangalan"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control"
              rows="4"
              placeholder="Ilagay ang iyong feedback"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating:</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`btn btn-lg ${rating >= star ? "btn-warning" : "btn-outline-secondary"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Ipadala
          </button>
        </form>
      </div>
    </div>
  );
}

export default Survey;

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

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

      // Show SweetAlert2 Success Message
      Swal.fire({
        title: "Salamat!",
        text: `Salamat, ${name}, sa iyong feedback: "${feedback}" at rating: ${rating}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form fields
      setName("");
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting survey:", error);

      // Show SweetAlert2 Error Message
      Swal.fire({
        title: "Error!",
        text: "May error sa pagpapadala ng iyong feedback.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">Form Survey</h2>
        <form onSubmit={handleSubmit}>
          {/* Pangalan Input */}
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

          {/* Feedback Input */}
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

          {/* Rating Buttons */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Ipadala
          </button>
        </form>
      </div>
    </div>
  );
}

export default Survey;

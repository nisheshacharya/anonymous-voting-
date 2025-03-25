
import { useState } from "react";
import "../styles/style.css"; 

const CandidateContainer = ({ positionId, onCandidateAdded }) => {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    candidateId: "",
  });

  const showAddCandidate = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidateData = { ...formData, positionId };
    setCandidates([...candidates, candidateData]);
    onCandidateAdded(candidateData);
    setFormData({ name: "", photo: null, candidateId: "" });
    setShowForm(false);
  };

  return (
    <div className="candidate-container">
      <h3 className="candidate-header">Candidates for Position ID: {positionId}</h3>

      {candidates.map((candidate, index) => (
        <div key={index} className="candidate-item">
          <p>Name: {candidate.name}</p>
          <p>Candidate ID: {candidate.candidateId}</p>
          {candidate.photo && (
            <img
              src={URL.createObjectURL(candidate.photo)}
              alt="Candidate"
              className="candidate-photo"
            />
          )}
        </div>
      ))}

      <button className="add-candidate-button" onClick={showAddCandidate}>
        Add Candidate
      </button>

      {showForm && (
        <div className="candidate-form-container">
          <form className="candidate-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Candidate Name"
              required={true}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="candidateId"
              placeholder="Candidate ID"
              required={true}
              onChange={handleChange}
            />
            <br />
            <input
              type="file"
              name="photo"
              accept="image/*"
              required={true}
              onChange={handleChange}
            />
            <br />
            <button type="submit" className="submit-candidate-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateContainer;
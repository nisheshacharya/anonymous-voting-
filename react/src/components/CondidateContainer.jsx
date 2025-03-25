// CandidateContainer.jsx
import React, { useState } from "react";
import "../styles/style.css";

const CandidateContainer = ({ positionId, onCandidateAdded, userRole }) => {
  const [candidates, setCandidates] = useState([]);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    name: "",
    photo: null,
    candidateId: "",
  });
  const [editCandidateId, setEditCandidateId] = useState(null);

  const showAddCandidate = () => {
    setShowCandidateForm(true);
    setCandidateFormData({ name: "", photo: null, candidateId: "" });
    setEditCandidateId(null);
  };

  const handleChangeCandidate = (e) => {
    if (e.target.name === "photo") {
      setCandidateFormData({ ...candidateFormData, photo: e.target.files[0] });
    } else {
      setCandidateFormData({ ...candidateFormData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitCandidate = (e) => {
    e.preventDefault();
    if (editCandidateId) {
      setCandidates(candidates.map(cand =>
        cand.candidateId === editCandidateId ? { ...candidateFormData, positionId } : cand
      ));
    } else {
      setCandidates([...candidates, { ...candidateFormData, positionId }]);
    }
    setCandidateFormData({ name: "", photo: null, candidateId: "" });
    setShowCandidateForm(false);
    setEditCandidateId(null);
  };

  const handleEditCandidate = (candidateId) => {
    const candidateToEdit = candidates.find(cand => cand.candidateId === candidateId);
    if (candidateToEdit) {
      setCandidateFormData({ ...candidateToEdit, photo: null });
      setShowCandidateForm(true);
      setEditCandidateId(candidateId);
    }
  };

  return (
    <div className="candidate-container">
      <h3 className="candidate-header">Candidates for Position ID: {positionId}</h3>

      {candidates.map((candidate, index) => (
        <div key={index} className="candidate-item">
          <p>Name: {candidate.name}</p>
          <p>Candidate ID: {candidate.candidateId}</p>
          {candidate.photo && (
            <img src={URL.createObjectURL(candidate.photo)} alt="Candidate" className="candidate-photo" />
          )}
          {userRole === 'admin' && (
            <button className="edit-button" onClick={() => handleEditCandidate(candidate.candidateId)}>Edit Candidate</button>
          )}
        </div>
      ))}

      {userRole === 'admin' && (
        <>
          <button className="add-candidate-button" onClick={showAddCandidate}>
            Add Candidate
          </button>

          {showCandidateForm && (
            <div className="candidate-form-container">
              <form className="candidate-form" onSubmit={handleSubmitCandidate}>
                <input type="text" name="name" placeholder="Candidate Name" required={true} value={candidateFormData.name} onChange={handleChangeCandidate} />
                <br />
                <input type="text" name="candidateId" placeholder="Candidate ID" required={true} value={candidateFormData.candidateId} onChange={handleChangeCandidate} />
                <br />
                <input type="file" name="photo" accept="image/*" onChange={handleChangeCandidate} />
                <br />
                <button type="submit" className="submit-candidate-button">
                  {editCandidateId ? "Update Candidate" : "Submit Candidate"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateContainer;
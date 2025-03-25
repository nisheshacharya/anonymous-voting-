import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { useSelectedOnes } from "../context/CandidateContext";

const CandidateContainer = ({ positionId, userRole, maxSelection, onSelectionChange }) => {
  const { selectedOnes, setSelectedOnes, candidatesData, updateCandidates } = useSelectedOnes();
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    name: "",
    photo: null,
    candidateId: "",
  });
  const [editCandidateId, setEditCandidateId] = useState(null);

  useEffect(() => {
    if (!candidatesData[positionId]) {
      updateCandidates(positionId, []);
    }
  }, [positionId, candidatesData, updateCandidates]);

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
    const updatedCandidates = editCandidateId
      ? candidatesData[positionId].map((cand) =>
          cand.candidateId === editCandidateId ? { ...candidateFormData, positionId } : cand
        )
      : [...(candidatesData[positionId] || []), { ...candidateFormData, positionId }];

    updateCandidates(positionId, updatedCandidates);
    setCandidateFormData({ name: "", photo: null, candidateId: "" });
    setShowCandidateForm(false);
    setEditCandidateId(null);
  };

  const handleEditCandidate = (candidateId) => {
    const candidateToEdit = candidatesData[positionId]?.find((cand) => cand.candidateId === candidateId);
    if (candidateToEdit) {
      setCandidateFormData({ ...candidateToEdit, photo: null });
      setShowCandidateForm(true);
      setEditCandidateId(candidateId);
    }
  };

  const handleSelect = (candidateId) => {
    const isSelected = selectedOnes[positionId]?.includes(candidateId) || false;
    const currentSelections = selectedOnes[positionId] || [];
    if (!isSelected && currentSelections.length >= maxSelection) {
      alert(`You can only select up to ${maxSelection} candidates.`);
      return;
    }
    setSelectedOnes((prevSelectedOnes) => {
      const updatedSelections = isSelected
        ? prevSelectedOnes[positionId]?.filter((id) => id !== candidateId)
        : [...(prevSelectedOnes[positionId] || []), candidateId];

      return { ...prevSelectedOnes, [positionId]: updatedSelections };
    });

    onSelectionChange(positionId, candidateId, !isSelected);
  };

  return (
    <div className="candidate-container">
      <h3 className="candidate-header">Candidates for Position ID: {positionId}</h3>

      {candidatesData[positionId]?.map((candidate, index) => (
        <div key={index} className="candidate-item">
          <p>Name: {candidate.name}</p>
          <p>Candidate ID: {candidate.candidateId}</p>
          {candidate.photo && <img src={URL.createObjectURL(candidate.photo)} alt="Candidate" className="candidate-photo" />}
          {userRole === "voter" && (
            <button
              className={`select-button ${selectedOnes[positionId]?.includes(candidate.candidateId) ? "unselect" : ""}`}
              onClick={() => handleSelect(candidate.candidateId)}
            >
              {selectedOnes[positionId]?.includes(candidate.candidateId) ? "Unselect" : "Select"}
            </button>
          )}
          {userRole === "admin" && (
            <button className="edit-button" onClick={() => handleEditCandidate(candidate.candidateId)}>
              Edit Candidate
            </button>
          )}
        </div>
      ))}

      {userRole === "admin" && (
        <>
          <button className="add-candidate-button" onClick={showAddCandidate}>
            Add Candidate
          </button>

          {showCandidateForm && (
            <div className="candidate-form-container">
              <form className="candidate-form" onSubmit={handleSubmitCandidate}>
                <input type="text" name="name" placeholder="Candidate Name" required value={candidateFormData.name} onChange={handleChangeCandidate} />
                <br />
                <input type="text" name="candidateId" placeholder="Candidate ID" required value={candidateFormData.candidateId} onChange={handleChangeCandidate} />
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

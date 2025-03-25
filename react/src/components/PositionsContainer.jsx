
import React, { useState } from "react";
import CandidateContainer from "./CondidateContainer";
import "../styles/style.css";

const PositionsContainer = ({ userRole }) => {
  const [positions, setPositions] = useState([]);
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [positionFormData, setPositionFormData] = useState({
    position: "",
    name: "",
    positionId: "",
  });
  const [editPositionId, setEditPositionId] = useState(null);

  const showAddPosition = () => {
    setShowPositionForm(true);
    setPositionFormData({ position: "", name: "", positionId: "" });
    setEditPositionId(null);
  };

  const handleChangePosition = (e) => {
    setPositionFormData({ ...positionFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitPosition = (e) => {
    e.preventDefault();
    if (editPositionId) {
      setPositions(positions.map(pos =>
        pos.positionId === editPositionId ? positionFormData : pos
      ));
    } else {
      setPositions([...positions, positionFormData]);
    }
    setPositionFormData({ position: "", name: "", positionId: "" });
    setShowPositionForm(false);
    setEditPositionId(null);
  };

  const handleEditPosition = (positionId) => {
    const positionToEdit = positions.find(pos => pos.positionId === positionId);
    if (positionToEdit) {
      setPositionFormData(positionToEdit);
      setShowPositionForm(true);
      setEditPositionId(positionId);
    }
  };

  const handleCandidateAdded = (candidateData) => {
    console.log("Candidate added:", candidateData);
  };

  return (
    <div className="positions-container">
      <h2 className="main-header">Different Positions and candidates</h2>

      {positions.map((pos, index) => (
        <div key={index} className="position-item">
          <strong>Position:</strong> {pos.position}, <strong>Candidate:</strong> {pos.name}, <strong>ID:</strong> {pos.positionId}
          {userRole === 'admin' && (
            <button className="edit-button" onClick={() => handleEditPosition(pos.positionId)}>Edit Position</button>
          )}
          <CandidateContainer positionId={pos.positionId} onCandidateAdded={handleCandidateAdded} userRole={userRole} />
        </div>
      ))}

      {userRole === 'admin' && (
        <>
          <button className="add-button" onClick={showAddPosition}>
            Add Position
          </button>

          {showPositionForm && (
            <div className="form-container">
              <form className="main-form" onSubmit={handleSubmitPosition}>
                <input type="text" name="position" placeholder="Position Name" required={true} value={positionFormData.position} onChange={handleChangePosition} />
                <br />
                <input type="text" name="name" placeholder="Candidate Name" required={true} value={positionFormData.name} onChange={handleChangePosition} />
                <br />
                <input type="text" name="positionId" placeholder="Position Id" required={true} value={positionFormData.positionId} onChange={handleChangePosition} />
                <br />
                <button type="submit" className="submit-button">
                  {editPositionId ? "Update Position" : "Submit Position"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PositionsContainer;
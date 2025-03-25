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
    maxSelection: "",
  });
  const [editPositionId, setEditPositionId] = useState(null);
  const [selections, setSelections] = useState({});

  const showAddPosition = () => {
    setShowPositionForm(true);
    setPositionFormData({ position: "", name: "", positionId: "", maxSelection: "" });
    setEditPositionId(null);
  };

  const handleChangePosition = (e) => {
    setPositionFormData({ ...positionFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitPosition = (e) => {
    e.preventDefault();
    if (editPositionId) {
      setPositions(positions.map(pos => {
        if (pos.positionId === editPositionId) {
          return {
            ...positionFormData,
            maxSelection: parseInt(positionFormData.maxSelection)
          };
        }
        return pos;
      }));
    } else {
      setPositions([...positions, positionFormData]);
      setSelections({...selections, [positionFormData.positionId]:[]}) //add position to selections
    }
    setPositionFormData({ position: "", name: "", positionId: "", maxSelection: "" });
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

  const handleSelectionChange = (positionId, candidateId, isSelected) => {
    setSelections(prevSelections => {
      const positionSelections = prevSelections[positionId] || [];
      if (isSelected) {
        return { ...prevSelections, [positionId]: [...positionSelections, candidateId] };
      } else {
        return { ...prevSelections, [positionId]: positionSelections.filter(id => id !== candidateId) };
      }
    });
  };

  const handleSubmitSelections = () => {
    console.log("Submitted Selections:", selections);
    // Will later send to the backend.
  };

  return (
    <div className="positions-container">
      <h2 className="main-header">Different Positions and candidates</h2>

      {positions.map((pos, index) => (
        <div key={index} className="position-item">
          <strong> Position:</strong> {pos.position},
          <strong> Candidate:</strong> {pos.name},
          <strong> ID:</strong> {pos.positionId},
          <strong> Max Selection:</strong> {pos.maxSelection}
          {userRole === 'admin' && (
            <button className="edit-button" onClick={() => handleEditPosition(pos.positionId)}>Edit Position</button>
          )}
          <CandidateContainer
            positionId={pos.positionId}
            onCandidateAdded={handleCandidateAdded}
            userRole={userRole}
            maxSelection={pos.maxSelection}
            onSelectionChange={handleSelectionChange}
            selectedCandidates={selections[pos.positionId] || []}
          />
          {userRole === 'voter' && (
            <p>You have {pos.maxSelection - (selections[pos.positionId] || []).length} selections left.</p>
          )}
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
                <input type="number" name="maxSelection" placeholder="How many candidates can be voted?" value={positionFormData.maxSelection} onChange={handleChangePosition} />
                <button type="submit" className="submit-button">
                  {editPositionId ? "Update Position" : "Submit Position"}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {userRole === 'voter' && (
        <button className="submit-button" onClick={handleSubmitSelections}>Submit Selection</button>
      )}
    </div>
  );
};

export default PositionsContainer;
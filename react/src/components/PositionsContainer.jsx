import React, { useState, useEffect } from "react";
import CandidateContainer from "./CondidateContainer";
import "../styles/style.css";
import { useNavigate } from 'react-router-dom';

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
  const [addPositionVisible, setAddPositionVisible] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationPositionId, setConfirmationPositionId] = useState(null);

  useEffect(() => {
    if (showConfirmation) {
      console.log("HERE IS CONFIRMATION should be rendered now!");
    }
  }, [showConfirmation]);

  const navigate = useNavigate();

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
      setPositions(positions.map((pos) => {
        if (pos.positionId === editPositionId) {
          return {
            ...positionFormData,
            maxSelection: parseInt(positionFormData.maxSelection),
          };
        }
        return pos;
      }));
    } else {
      setPositions([...positions, positionFormData]);
      setSelections({ ...selections, [positionFormData.positionId]: [] }); //add position to selections
      setAddPositionVisible(false);
    }
    setPositionFormData({ position: "", name: "", positionId: "", maxSelection: "" });
    setShowPositionForm(false);
    setEditPositionId(null);
  };

  const handleEditPosition = (positionId) => {
    const positionToEdit = positions.find((pos) => pos.positionId === positionId);
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
    setSelections((prevSelections) => {
      const positionSelections = prevSelections[positionId] || [];
      if (isSelected) {
        return { ...prevSelections, [positionId]: [...positionSelections, candidateId] };
      } else {
        return { ...prevSelections, [positionId]: positionSelections.filter((id) => id !== candidateId) };
      }
    });
  };

  const handleSubmitSelections = () => {
    console.log(" handleSubmitSelections called!!!!");
    const firstPositionId = Object.keys(selections)[0];
    console.log(" firstPositionId: ", firstPositionId);
    if (firstPositionId) {
      setShowConfirmation(true);
      setConfirmationPositionId(firstPositionId);
      console.log("showConfirmation:", true, "confirmationPositionId:", firstPositionId);
    }
  };


  const confirmSelections = () => {

    console.log("Submitted Selections:", selections);
    setShowConfirmation(false);
    setConfirmationPositionId(null);
    // To do: send the selections to your backend
    navigate('/thank-you'); // Navigate to the ThankYouPage
  };
  // const confirmSelections = () => {
  //   console.log("Submitted Selections:", selections);
  //   setShowConfirmation(false);
  //   setConfirmationPositionId(null);
  //   // To do: send the selections to your backend
  // };

  const cancelSelections = () => {
    setShowConfirmation(false);
    setConfirmationPositionId(null);
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
          {userRole === "admin" && (
            <button className="edit-button" onClick={() => handleEditPosition(pos.positionId)}>
              Edit Position
            </button>
          )}
          <CandidateContainer
            positionId={pos.positionId}
            onCandidateAdded={handleCandidateAdded}
            userRole={userRole}
            maxSelection={pos.maxSelection}
            onSelectionChange={handleSelectionChange}
            selectedCandidates={selections[pos.positionId] || []}
          />
          {userRole === "voter" && (
            <p>You have {pos.maxSelection - (selections[pos.positionId] || []).length} selections left.</p>
          )}
        </div>

      ))}
      <div>

      </div>

      {userRole === "admin" && (
        <div>
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

        </div>
      )}

      {userRole === "voter" && positions.length > 0 && (
        <button className="submit-button" onClick={handleSubmitSelections}>
          Submit Selection
        </button>
      )}

      {positions.length === 0 && (
        <div>
          <h3>No candidates available to vote right now</h3>
        </div>
      )}

      {showConfirmation && (

        <div className="confirmation-modal">
          <div className="confirmation-content">
            {console.log("showConfirmation before render:", showConfirmation)}
            <h3>Confirm Selections</h3>
            {console.log("Confirmation Position ID in modal:", confirmationPositionId)}
            <ul>
              {selections[confirmationPositionId] &&
                selections[confirmationPositionId].map((candidateId) => (
                  <li key={candidateId}>
                    Candidate ID: {candidateId}
                  </li>
                ))}
            </ul>
            <button className="confirm-button" onClick={confirmSelections}>
              Confirm
            </button>
            <button className="cancel-button" onClick={cancelSelections}>
              Make Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionsContainer;
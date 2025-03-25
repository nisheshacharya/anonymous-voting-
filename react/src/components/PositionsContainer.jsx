
import { useState } from "react";
import CandidateContainer from "./CondicateContainer";
import "../styles/style.css";

const PositionsContainer = () => {
    const [positions, setPositions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        position: "",
        name: "",
        positionId: "",
    });

    const showAddPosition = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPositions([...positions, formData]);
        setFormData({ position: "", description: "", positionId: "" });
        setShowForm(false);
    };

    const handleCandidateAdded = (candidateData) => {
        // Handle added candidate data in parent component if needed
        console.log("Candidate added:", candidateData);
    };

    return (
        <div className="positions-container">
            <h2 className="main-header">Different Positions and candidates</h2>

            {positions.map((pos, index) => (
                <div key={index} className="position-item">
                    <strong>Position:</strong> {pos.position}, <strong>Description:</strong> {pos.description}, <strong>ID:</strong> {pos.positionId}
                    <CandidateContainer positionId={pos.positionId} onCandidateAdded={handleCandidateAdded} />
                </div>
            ))}

            <button className="add-button" onClick={showAddPosition}>
                Add Position
            </button>

            {showForm && (
                <div className="form-container">
                    <form className="main-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="position"
                            placeholder="Position Name"
                            required={true}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            required={true}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="text"
                            name="positionId"
                            placeholder="Position Id"
                            required={true}
                            onChange={handleChange}
                        />
                        <br />
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PositionsContainer;
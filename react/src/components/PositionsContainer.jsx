import { useState } from "react";

const PositionsContainer = () => {
    const [positions, setPositions] = useState([]); // Initialize as an empty array
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
        setPositions([...positions, formData]); // Add new position to array
        setFormData({ position: "", name: "", positionId: "" });
        setShowForm(false);
    };

    return (
        <div>
            <h2>Different Positions and candidates</h2>

            {positions.map((pos, index) => (
                <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <strong>Position:</strong> {pos.position}, <strong>Candidate:</strong> {pos.name}, <strong>ID:</strong> {pos.positionId}
                </div>
            ))}

            <button onClick={showAddPosition}>Add Position</button>

            {showForm && (
                <div className="position-form">
                    <form onSubmit={handleSubmit}>
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
                            name="name"
                            placeholder="Candidate Name"
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
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default PositionsContainer;
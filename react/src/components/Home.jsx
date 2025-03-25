
import PositionsContainer from "./PositionsContainer";
import { useRole } from "../context/RoleContext";

const Home = () => {
  const { userRole, toggleRole } = useRole();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={toggleRole}>
        Switch to {userRole === 'voter' ? 'Admin' : 'Voter'} View
      </button>
      <PositionsContainer userRole={userRole} />
    </div>
  );
};

export default Home;
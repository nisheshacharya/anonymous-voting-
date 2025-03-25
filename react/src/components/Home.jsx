
import PositionsContainer from "./PositionsContainer";
import { useRole } from "../context/RoleContext";
import { CandidateProvider } from "../context/CandidateContext";

const Home = () => {
  const { userRole, toggleRole } = useRole();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={toggleRole}>
        Switch to {userRole === 'voter' ? 'Admin' : 'Voter'} View
      </button>
      <CandidateProvider>
        <PositionsContainer userRole={userRole} />
      </CandidateProvider>
    </div>
  );
};

export default Home;
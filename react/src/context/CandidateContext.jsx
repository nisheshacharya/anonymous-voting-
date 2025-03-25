import React, { createContext, useContext, useState } from "react";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [selectedOnes, setSelectedOnes] = useState({}); // Stores selected candidates per positionId
  const [candidatesData, setCandidatesData] = useState({}); // Stores all candidates per positionId

  // Function to add/update candidates in the context
  const updateCandidates = (positionId, newCandidates) => {
    setCandidatesData((prev) => ({
      ...prev,
      [positionId]: newCandidates,
    }));
  };

  return (
    <CandidateContext.Provider
      value={{
        selectedOnes,
        setSelectedOnes,
        candidatesData,
        updateCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};


export const useSelectedOnes = () => useContext(CandidateContext);

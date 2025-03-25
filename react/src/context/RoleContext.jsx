import React, { createContext, useState, useContext } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('voter');

  // ✅ Fix: Use functional state update to avoid stale state issues
  const toggleRole = () => {
    setUserRole((prevRole) => (prevRole === 'voter' ? 'admin' : 'voter'));
  };

  return (
    <RoleContext.Provider value={{ userRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};


export const useRole = () => useContext(RoleContext);

import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserContext.Provider value={}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

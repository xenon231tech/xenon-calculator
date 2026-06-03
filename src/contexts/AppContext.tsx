import React, { createContext, useContext } from 'react';

const AppContext = createContext(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider value={}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

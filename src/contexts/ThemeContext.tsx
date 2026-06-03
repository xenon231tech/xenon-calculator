import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

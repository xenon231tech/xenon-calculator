import React, { createContext, useContext } from 'react';

const NotificationContext = createContext(null);

export const NotificationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NotificationContext.Provider value={}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

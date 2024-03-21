"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserIdContextType {
  userId: string;
  setId: (newId: string) => void;
}

const UserIdContext = createContext<UserIdContextType>({
  userId: '',
  setId: () => {},
});


export const useUserId = () => useContext(UserIdContext);

interface UserIdProviderProps {
  children: ReactNode;
}

export const UserIdProvider: React.FC<UserIdProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>('');

  const setId = (newId: string) => {
    setUserId(newId);
  };

  return (
    <UserIdContext.Provider value={{ userId, setId }}>
      {children}
    </UserIdContext.Provider>
  );
};

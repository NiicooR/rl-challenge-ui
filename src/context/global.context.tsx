import React, { createContext, useState } from 'react';

type SelectedReserveToken = { name: string; address: string };

type GlobalContextType = {
  isConnected: boolean;
  setIsConnected: (_: boolean) => void;
  selectedReserveToken: SelectedReserveToken | null;
  setSelectedReserveToken: (_: SelectedReserveToken) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedReserveToken, setSelectedReserveToken] = useState<SelectedReserveToken | null>(null);
  return (
    <GlobalContext.Provider value={{ isConnected, setIsConnected, selectedReserveToken, setSelectedReserveToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

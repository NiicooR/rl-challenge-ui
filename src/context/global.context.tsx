import React, { createContext, useState } from 'react';

type SelectedReserveToken = { name: string; tokenAddress: string; reserveTokenAddress: string };

type GlobalContextType = {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  selectedReserveToken: SelectedReserveToken | null;
  setSelectedReserveToken: (selectedReserveToken: SelectedReserveToken) => void;
  isAppLoading: boolean;
  setIsAppLoading: (isLoading: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [selectedReserveToken, setSelectedReserveToken] = useState<SelectedReserveToken | null>(null);
  return (
    <GlobalContext.Provider
      value={{
        isConnected,
        setIsConnected,
        selectedReserveToken,
        setSelectedReserveToken,
        isAppLoading,
        setIsAppLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

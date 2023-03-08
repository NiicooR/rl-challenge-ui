import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { GlobalContext } from '../context/global.context';

export const Connect = () => {
  const [connectedAddress, setConnectedAddress] = useState('');
  const useGlobalContext = useContext(GlobalContext);

  const connectWallet = async () => {
    if (connectedAddress) {
      setConnectedAddress('');
      useGlobalContext?.setIsConnected(false);
      return;
    }
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts) {
          setConnectedAddress(accounts.find((e: any) => e));
          useGlobalContext?.setIsConnected(true);
        }
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chainId !== '0x5') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
          });
        }
      } catch (error) {
        console.log('Error during connection');
      }
    } else {
      console.warn('Please install Metamask extension');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Button onClick={() => connectWallet()} variant="primary" disabled={useGlobalContext?.isAppLoading}>
          {!connectedAddress ? 'Connect' : 'Disconnect'}
        </Button>
        <div>Connected address: {connectedAddress ? connectedAddress : '-'}</div>
      </div>
    </>
  );
};

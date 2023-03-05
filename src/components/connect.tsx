import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export const Connect = () => {
  const [connectedAddress, setConnectedAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts) {
        setConnectedAddress(accounts.find((e: any) => e));
      }
      console.log(accounts);
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== '0x5') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
      }
    } else {
      alert('Please install Metamask extension');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Button onClick={() => connectWallet()} variant="primary">
          Connect
        </Button>
        <div>Connected address: {connectedAddress}</div>
      </div>
    </>
  );
};

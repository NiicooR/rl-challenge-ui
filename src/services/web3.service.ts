import Web3 from 'web3';
import { decimals, symbol } from './erc20.service';

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('A provider is needed, connect with your wallet');
  }
  return new Web3(window.ethereum);
};

export const getSelectedAddress = async (): Promise<string> => {
  const account = (await getProvider().eth.getAccounts()).find((e) => e);
  if (!account) throw new Error('Connect with Metamask');
  return account;
};

export const addTokenToWallet = async (tokenAddress: string) => {
  await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: await symbol(tokenAddress),
        decimals: await decimals(tokenAddress),
        image: '',
      },
    },
  });
};

import Web3 from 'web3';

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('A provider is needed, connect with your wallet');
  }
  return new Web3(window.ethereum);
};

export const getSelectedAddress = async (): Promise<string> => {
  const account = (await (await getProvider()).eth.getAccounts()).find((e) => e);
  if (!account) throw new Error('Connect with Metamask');
  return account;
};

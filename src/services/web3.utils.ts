import { getProvider } from './web3.service';

export const getAPYPercentage = (liquidityRate: number) => {
  const RAY = 10 ** 27;
  return (liquidityRate / RAY) * 100;
};

export const fromWei = (wei: string) => {
  return getProvider().utils.fromWei(wei);
};
export const toWei = (eth: string) => {
  return getProvider().utils.toWei(eth);
};

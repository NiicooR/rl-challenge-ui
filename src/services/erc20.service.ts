import { POOL_DATA_PROVIDER } from './abi/poolDataProvider.abi';
import { getPoolDataProvider } from './poolAddressesProvider.service';
import { getProvider, getSelectedAddress } from './web3.service';
import { AbiItem } from 'web3-utils';
import { ERC20_ABI } from './abi/erc20WithPermit.abi';

const getErc20Contract = async (address: string) => {
  const web3 = getProvider();
  return new web3.eth.Contract(ERC20_ABI as AbiItem[], address);
};

export const balanceOf = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return await contract.methods.balanceOf(await getSelectedAddress()).call();
};

export const name = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return await contract.methods.name().call();
};

export const symbol = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return (await contract.methods.symbol().call()) as string;
};

export const decimals = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return (await contract.methods.decimals().call()) as string;
};
export const nonces = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return await contract.methods.nonces(await getSelectedAddress()).call();
};

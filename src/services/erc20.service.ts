import { POOL_DATA_PROVIDER } from './abi/poolDataProvider.abi';
import { getPoolDataProvider } from './poolAddressesProvider.service';
import { getProvider, getSelectedAddress } from './web3.service';
import { AbiItem } from 'web3-utils';
import { ERC20_ABI } from './abi/erc20.abi';

const getErc20Contract = async (address: string) => {
  const web3 = await getProvider();
  return new web3.eth.Contract(ERC20_ABI as AbiItem[], address);
};

export const balanceOf = async (tokenAddress: string) => {
  const contract = await getErc20Contract(tokenAddress);
  return await contract.methods.balanceOf(await getSelectedAddress()).call();
};

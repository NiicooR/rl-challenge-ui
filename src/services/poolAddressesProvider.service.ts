import { POOL_ADDRESSES_PROVIDER_ABI } from './abi/poolAddressesProvider.abi';
import { getProvider } from './web3.service';
import { AbiItem } from 'web3-utils';

const POOL_ADDRESSES_PROVIDER_ADDRESS = '0xC911B590248d127aD18546B186cC6B324e99F02c';

const getPoolAddressesProviderContract = async () => {
  const web3 = await getProvider();
  return new web3.eth.Contract(POOL_ADDRESSES_PROVIDER_ABI as AbiItem[], POOL_ADDRESSES_PROVIDER_ADDRESS);
};

export const getPool = async () => {
  const contract = await getPoolAddressesProviderContract();
  return await contract.methods.getPool().call();
};

export const getPoolDataProvider = async () => {
  const contract = await getPoolAddressesProviderContract();
  return await contract.methods.getPoolDataProvider().call();
};

import { POOL_DATA_PROVIDER } from './abi/poolDataProvider.abi';
import { getPoolDataProvider } from './poolAddressesProvider.service';
import { getProvider } from './web3.service';
import { AbiItem } from 'web3-utils';

const getPoolDataProviderContract = async () => {
  const web3 = getProvider();
  return new web3.eth.Contract(POOL_DATA_PROVIDER as AbiItem[], await getPoolDataProvider());
};

export const getReservedData = async (address: string) => {
  const contract = await getPoolDataProviderContract();
  return (
    (await contract.methods.getReserveData(address).call()) as {
      liquidityRate: string;
    }
  ).liquidityRate;
};

export const getUserReserveData = async (asset: string, user: string) => {
  const contract = await getPoolDataProviderContract();

  return (await contract.methods.getUserReserveData(asset, user).call()) as {
    currentATokenBalance: string;
  };
};

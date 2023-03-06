import { POOL_DATA_PROVIDER } from './abi/poolDataProvider.abi';
import { getPoolDataProvider } from './poolAddressesProvider.service';
import { getProvider } from './web3.service';
import { AbiItem } from 'web3-utils';

const getAddressesProviderContract = async () => {
  const web3 = await getProvider();
  return new web3.eth.Contract(POOL_DATA_PROVIDER as AbiItem[], await getPoolDataProvider());
};

export const getReservedData = async (address: string) => {
  const contract = await getAddressesProviderContract();
  return (
    (await contract.methods.getReserveData(address).call()) as {
      liquidityRate: string;
    }
  ).liquidityRate;
};

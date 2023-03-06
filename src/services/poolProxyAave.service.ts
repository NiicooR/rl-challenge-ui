import { getPoolDataProvider } from './poolAddressesProvider.service';
import { getProvider } from './web3.service';
import { AbiItem } from 'web3-utils';
import { POOL_PROXY_AAVE_ABI } from './abi/poolProxyAave.abi';

const getPoolProxyAaveContract = async () => {
  const web3 = await getProvider();
  return new web3.eth.Contract(POOL_PROXY_AAVE_ABI as AbiItem[], await getPoolDataProvider());
};

export const getReservedData = async (address: string) => {
  const contract = await getPoolProxyAaveContract();
  return (
    (await contract.methods.supplyWithPermit(address).sign()) as {
      liquidityRate: string;
    }
  ).liquidityRate;
};

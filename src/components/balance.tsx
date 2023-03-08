import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/global.context';
import { getUserReserveData } from '../services/poolDataProvider.service';
import { getUserAccountData } from '../services/poolProxyAave.service';
import { getSelectedAddress } from '../services/web3.service';
import { fromWei } from '../services/web3.utils';
import { Input } from './base/input';
import { useUsdBalance } from './hook/useUsdBalance';

export const Balance = () => {
  const useGlobalContext = useContext(GlobalContext);
  const [tokenBalance, setTokenBalance] = useState('');
  const { getUsdBalance, usdBalance } = useUsdBalance();

  useEffect(() => {
    if (useGlobalContext?.selectedReserveToken) {
      (async () => {
        const connectedAddress = await getSelectedAddress();
        const userReserveData = await getUserReserveData(
          useGlobalContext!.selectedReserveToken!.reserveTokenAddress,
          await getSelectedAddress(),
        );
        setTokenBalance(userReserveData.currentATokenBalance);
        getUsdBalance(useGlobalContext!.selectedReserveToken!.name, userReserveData.currentATokenBalance);
      })();
    }
  }, [useGlobalContext]);

  if (!useGlobalContext) {
    return <></>;
  }
  return (
    <>
      <Input
        label={`${useGlobalContext!.selectedReserveToken!.name} supplied`}
        value={Number(fromWei(tokenBalance)).toFixed(2)}
        disabled
      />
      <Input label="Value in USD" value={Number(usdBalance).toFixed(2) || '-'} disabled />
    </>
  );
};

import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/global.context';
import { getUserReserveData } from '../../services/poolDataProvider.service';
import { withdraw } from '../../services/poolProxyAave.service';
import { getSelectedAddress } from '../../services/web3.service';
import { fromWei } from '../../services/web3.utils';

const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // https://docs.aave.com/developers/periphery-contracts/wethgateway#withdraweth

export const useWithdraw = (): { triggerWithdraw: () => void; isAvailable: boolean; isLoading: boolean } => {
  const useGlobalContext = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const reserveTokenAddress = useGlobalContext?.selectedReserveToken?.reserveTokenAddress;
      if (reserveTokenAddress) {
        const { currentATokenBalance } = await getUserReserveData(reserveTokenAddress, await getSelectedAddress());
        setIsAvailable(Boolean(Number(fromWei(currentATokenBalance))));
      }
    })();
  }, [useGlobalContext]);

  const triggerWithdraw = async () => {
    try {
      if (!useGlobalContext) return;
      useGlobalContext.setIsAppLoading(true);
      setIsLoading(true);
      const reserveTokenAddress = useGlobalContext?.selectedReserveToken?.reserveTokenAddress;
      if (reserveTokenAddress) {
        await withdraw(reserveTokenAddress, MAX_UINT);
      }
    } catch (error) {
      console.error('Error withdrawing all supplied balance');
    } finally {
      useGlobalContext!.setIsAppLoading(false);
      setIsLoading(false);
    }
  };

  return { triggerWithdraw, isAvailable, isLoading };
};

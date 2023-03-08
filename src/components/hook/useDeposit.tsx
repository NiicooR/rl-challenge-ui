import BigNumber from 'bignumber.js';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/global.context';
import { balanceOf } from '../../services/erc20.service';
import { deposit } from '../../services/poolProxyAave.service';
import { getSelectedAddress } from '../../services/web3.service';
import { toWei } from '../../services/web3.utils';

export const useDeposit = (): { triggerDeposit: (amountToSupply: string) => void; isLoading: boolean } => {
  const useGlobalContext = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const triggerDeposit = async (amountToSupply: string) => {
    if (!useGlobalContext || !useGlobalContext.selectedReserveToken) return;
    setIsLoading(true);
    useGlobalContext.setIsAppLoading(true);

    const { reserveTokenAddress } = useGlobalContext.selectedReserveToken;

    const balance = await balanceOf(reserveTokenAddress);
    const weiBalance = balance;
    const weiAmountToSupply = toWei(amountToSupply);
    if (BigInt(weiAmountToSupply) > BigInt(weiBalance)) {
      console.error('Amount to supply is greater than available balance');
      setIsLoading(false);
      useGlobalContext.setIsAppLoading(false);
      return;
    }

    try {
      await deposit(reserveTokenAddress, toWei(amountToSupply));
      await fetch(`${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assetAddress: useGlobalContext.selectedReserveToken.reserveTokenAddress,
          amount: amountToSupply,
          originAddress: await getSelectedAddress(),
          tag: useGlobalContext.selectedReserveToken.name,
        }),
      });
    } catch (error) {
      console.error('Deposit has failed');
    } finally {
      setIsLoading(false);
      useGlobalContext.setIsAppLoading(false);
    }
  };
  return { triggerDeposit, isLoading };
};

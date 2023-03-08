import BigNumber from 'bignumber.js';
import { debug } from 'console';
import { useEffect, useState } from 'react';
import { fromWei } from '../../services/web3.utils';

export const useUsdBalance = (): {
  usdBalance: string;
  getUsdBalance: (assetSymbol: string, balanceToConvert: string) => void;
} => {
  const [usdBalance, setUsdBalance] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [balanceToConvert, setBalanceToConvert] = useState('');

  const getUsdBalance = (assetSymbol: string, balanceToConvert: string) => {
    setAssetSymbol(assetSymbol);
    setBalanceToConvert(balanceToConvert);
  };

  useEffect(() => {
    (async () => {
      if (!assetSymbol || !balanceToConvert) return;
      try {
        const res = await fetch(
          `/api/usdBalance?${new URLSearchParams({
            assetSymbol,
          })}`,
        );
        const data = await res.json();
        if (res.status === 500) throw new Error();
        const convertedBalance = BigNumber(data.rate).multipliedBy(fromWei(balanceToConvert));
        setUsdBalance(convertedBalance.toString());
      } catch (error) {
        console.error('Error fetching usd balance');
        setUsdBalance('0');
      }
    })();
  }, [assetSymbol, balanceToConvert]);

  return { usdBalance, getUsdBalance };
};

import BigNumber from 'bignumber.js';
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
    {
      setAssetSymbol(assetSymbol);
      setBalanceToConvert(balanceToConvert);
    }
  };

  useEffect(() => {
    (async () => {
      if (!assetSymbol || !balanceToConvert) return;
      try {
        throw Error;
        const res = await fetch(`https://rest.coinapi.io/v1/exchangerate/${assetSymbol}/USD`, {
          headers: {
            'X-CoinAPI-Key': 'B3E9AD73-4432-4622-A925-6A3845F9838D',
          },
        });
        const data = await res.json();
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

import Button from 'react-bootstrap/Button';
import { Connect } from '../components/connect';
import { Input } from '../components/base/input';
import { PoolSelector } from '../components/poolSelector';
import { deposit } from '../services/poolProxyAave.service';
import { GlobalContext } from '../context/global.context';
import { useContext, useEffect, useState } from 'react';
import { balanceOf } from '../services/erc20.service';
import { fromWei, toWei } from '../services/web3.utils';

export default function Home() {
  const useGlobalContext = useContext(GlobalContext);
  const [userBalance, setUserBalance] = useState('0');
  const [amountToSupply, setAmountToSupply] = useState('0');

  useEffect(() => {
    (async () => {
      if (useGlobalContext?.selectedReserveToken) {
        const balance = await balanceOf(useGlobalContext.selectedReserveToken!.address);
        setUserBalance(fromWei(balance));
        setAmountToSupply(fromWei(balance));
      }
    })();
  }, [useGlobalContext]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '1rem' }}>
        <Connect />
        {useGlobalContext?.isConnected && (
          <>
            <PoolSelector />
            {useGlobalContext.selectedReserveToken && (
              <>
                <Input label={`${useGlobalContext.selectedReserveToken.name} available`} value={userBalance} disabled />
                <Input
                  onChange={(value) => setAmountToSupply(value)}
                  label={`${useGlobalContext.selectedReserveToken.name} to supply`}
                  value={amountToSupply}
                />
                {/* <Input label="_ Supplied" value="2000" disabled />
                <Input label="Value in USD" value="2000" disabled /> */}
                <Button
                  variant="primary"
                  onClick={async () => {
                    if (BigInt(toWei(amountToSupply)) > BigInt(toWei(userBalance))) {
                      console.error('Amount to supply is greater than available balance');
                      return;
                    }
                    if (!useGlobalContext.selectedReserveToken?.address) return;
                    try {
                      await deposit(useGlobalContext.selectedReserveToken.address, toWei(amountToSupply));
                    } catch (error) {
                      console.error('Deposit has failed');
                    }
                  }}
                >
                  Supply
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

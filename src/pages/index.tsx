import Button from 'react-bootstrap/Button';
import { Connect } from '../components/connect';
import { Input } from '../components/base/input';
import { PoolSelector } from '../components/poolSelector';
import { GlobalContext } from '../context/global.context';
import { useContext, useEffect, useState } from 'react';
import { balanceOf } from '../services/erc20.service';
import { fromWei, toWei } from '../services/web3.utils';
import { Balance } from '../components/balance';
import { useDeposit } from '../components/hook/useDeposit';
import { Spinner } from 'react-bootstrap';
import { withdraw } from '../services/poolProxyAave.service';
import { getUserReserveData } from '../services/poolDataProvider.service';
import { getSelectedAddress } from '../services/web3.service';

export default function Home() {
  const useGlobalContext = useContext(GlobalContext);
  const [userBalance, setUserBalance] = useState('0');
  const [amountToSupply, setAmountToSupply] = useState('0');
  const { triggerDeposit, isLoading: isDepositLoading } = useDeposit();

  useEffect(() => {
    (async () => {
      if (useGlobalContext?.selectedReserveToken) {
        const balance = await balanceOf(useGlobalContext.selectedReserveToken!.reserveTokenAddress);
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
                  disabled={useGlobalContext.isAppLoading}
                  onChange={(value) => setAmountToSupply(value)}
                  label={`${useGlobalContext.selectedReserveToken.name} to supply`}
                  value={amountToSupply}
                />
                <Balance />
                {!isDepositLoading ? (
                  <Button
                    variant="primary"
                    onClick={async () => {
                      triggerDeposit(amountToSupply);
                    }}
                  >
                    Supply
                  </Button>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

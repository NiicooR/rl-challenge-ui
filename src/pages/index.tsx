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
import { addTokenToWallet } from '../services/web3.service';
import { useWithdraw } from '../components/hook/useWithdraw';

export default function Home() {
  const useGlobalContext = useContext(GlobalContext);
  const [userBalance, setUserBalance] = useState('0');
  const [amountToSupply, setAmountToSupply] = useState('0');
  const { triggerDeposit, isLoading: isDepositLoading } = useDeposit();
  const { triggerWithdraw, isAvailable, isLoading: isWithdrawLoading } = useWithdraw();

  useEffect(() => {
    (async () => {
      if (useGlobalContext?.selectedReserveToken) {
        const balance = await balanceOf(useGlobalContext.selectedReserveToken!.reserveTokenAddress);
        setUserBalance(fromWei(balance));
      }
    })();
  }, [useGlobalContext]);

  const spinner = (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

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
                  placeholder={userBalance}
                />
                <Balance />

                {!isDepositLoading ? (
                  <Button
                    disabled={
                      Number(amountToSupply) < 0 ||
                      !Boolean(Number(amountToSupply)) ||
                      BigInt(toWei(amountToSupply)) > BigInt(toWei(userBalance))
                    }
                    variant="primary"
                    onClick={async () => {
                      triggerDeposit(amountToSupply);
                    }}
                  >
                    Supply
                  </Button>
                ) : (
                  spinner
                )}
                <Button
                  disabled={!useGlobalContext.selectedReserveToken?.tokenAddress || useGlobalContext?.isAppLoading}
                  variant="primary"
                  onClick={async () => {
                    await addTokenToWallet(useGlobalContext!.selectedReserveToken!.tokenAddress);
                  }}
                >
                  Add aToken to wallet
                </Button>

                {!isWithdrawLoading ? (
                  <Button
                    disabled={!isAvailable || useGlobalContext?.isAppLoading}
                    variant="primary"
                    onClick={async () => {
                      await triggerWithdraw();
                    }}
                  >
                    Withdraw all
                  </Button>
                ) : (
                  spinner
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { Select } from '../components/base/select';
import { GlobalContext } from '../context/global.context';
import { getReservedData } from '../services/poolDataProvider.service';
import { getAPYPercentage } from '../services/web3.utils';

export const PoolSelector = () => {
  const useGlobalContext = useContext(GlobalContext);
  const [pools, setPools] = useState<{ key: string; value: string }[]>([]);
  const [poolAPY, setPoolApy] = useState('0');

  useEffect(() => {
    fetchPools();
  }, []);

  async function fetchPools() {
    const res = await fetch('http://localhost:3001/pool', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setPools(data.map((e: any) => ({ key: e.reserveTokenAddress, value: e.name })));
  }

  const handleOnChange = async (value: string) => {
    const selected = pools.find((e) => e.key === value);
    useGlobalContext?.setSelectedReserveToken({ name: selected!.value, address: selected!.key });

    const selectedPoolApy = await getReservedData(value);
    setPoolApy(selectedPoolApy);
  };

  return (
    <>
      <Select onChange={handleOnChange} label="Select the pool" options={pools} />
      <div>{`APY: ${getAPYPercentage(Number(poolAPY)).toFixed(2)}`}</div>
    </>
  );
};

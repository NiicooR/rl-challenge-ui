import React, { useEffect, useState } from 'react';
import { Select } from '../components/base/select';

export const PoolSelector = () => {
  const [pools, setPools] = useState(null);

  useEffect(() => {
    fetchPools();
  }, []);

  async function fetchPools() {
    const res = await fetch('/pool', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setPools((await res.json()).data);
  }

  const apy = 0;
  const data = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
  ];
  return (
    <>
      <Select label="Select the pool" options={data} />
      <div>{`APY: ${apy}`}</div>
    </>
  );
};

export const getAPYPercentage = (liquidityRate: number) => {
  const RAY = 10 ** 27;
  return (liquidityRate / RAY) * 100;
};

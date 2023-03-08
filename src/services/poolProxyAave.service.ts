import { getPool } from './poolAddressesProvider.service';
import { getProvider, getSelectedAddress } from './web3.service';
import { AbiItem } from 'web3-utils';
import { POOL_PROXY_AAVE_ABI } from './abi/poolProxyAave.abi';
import { fromRpcSig } from 'ethereumjs-util';
import { name, nonces } from './erc20.service';

const getPoolProxyAaveContract = async () => {
  const web3 = getProvider();
  return new web3.eth.Contract(POOL_PROXY_AAVE_ABI as AbiItem[], await getPool());
};

const getRSVFromSignature = async (from: string, permitParams: string) => {
  const signature = await window.ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [from, permitParams],
    from: from,
  });

  const { v, r, s } = fromRpcSig(signature);

  return { r, s, v };
};

export const deposit = async (reserveToken: string, amount: string) => {
  const poolContract = await getPoolProxyAaveContract();
  const chainId = 5;
  const connectedAddress = await getSelectedAddress();
  const poolAddress = await getPool();
  const nonce = await nonces(reserveToken);

  const deadline = Date.now() + 600000; // current date + 10 min;
  const referralCode = 0;

  const permitParams = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    primaryType: 'Permit',
    domain: {
      name: await name(reserveToken),
      version: '1',
      chainId: chainId,
      verifyingContract: reserveToken,
    },
    message: {
      owner: connectedAddress,
      spender: poolAddress,
      value: amount,
      nonce: nonce,
      deadline: deadline,
    },
  };

  const { v, r, s } = await getRSVFromSignature(connectedAddress, JSON.stringify(permitParams));

  try {
    const res = await poolContract.methods
      .supplyWithPermit(reserveToken, amount, connectedAddress, referralCode, deadline, v, r, s)
      .send({ from: connectedAddress });
  } catch (er) {
    console.error((er as Error).message);
  }
};

export const getUserAccountData = async (user: string) => {
  const contract = await getPoolProxyAaveContract();
  return (await contract.methods.getUserAccountData(user).call()) as {
    totalCollateralBase: string;
  };
};

export const withdraw = async (reserveToken: string, amount: string) => {
  const connectedAddress = await getSelectedAddress();
  const poolContract = await getPoolProxyAaveContract();

  try {
    await poolContract.methods.withdraw(reserveToken, amount, connectedAddress).send({ from: connectedAddress });
  } catch (er) {
    console.error((er as Error).message);
  }
};

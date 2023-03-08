// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { asset_address, reserveTokenAddress, amount, origin_address, tag } = req.body;

  const data = await fetch('http://localhost:3001/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      asset_address,
      reserveTokenAddress,
      amount,
      origin_address,
      tag,
    }),
  });
  res.status(200).json(await data.json());
}

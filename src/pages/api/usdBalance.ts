// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { assetSymbol } = req.body;

  try {
    const isUsdFeatureEnabled = process.env.NEXT_PUBLIC_ENABLE_USD === 'true' || false;
    if (!isUsdFeatureEnabled) throw new Error('Wait till rate limit is over');
    const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${assetSymbol}/USD`, {
      headers: {
        'X-CoinAPI-Key': process.env.EXCHANGE_RATE_API_KEY || '',
      },
    });
    const data = await response.json();
    if (data.error) throw Error(data.error);
    res.status(200).json(data);
  } catch (er) {
    res.status(500).json({ error: (er as Error).message });
  }
}

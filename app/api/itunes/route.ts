import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const iTunesAPIBaseURL = 'https://itunes.apple.com';

  if (method === 'GET') {
    try {
      const response = await fetch(`${iTunesAPIBaseURL}${req.url}`);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
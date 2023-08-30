import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cookies = parse(req.headers.cookie || '');
      const accessToken = cookies.access_token || '';

      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while accessing the access token.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
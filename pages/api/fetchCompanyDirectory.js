import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve the access token from cookies
      const cookies = parse(req.headers.cookie || '');
      const accessToken = cookies.access_token || '';
      // Make the GET request to the API
      const apiUrl = 'https://sandbox.tryfinch.com/api/employer/directory';
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Finch-API-Version': '2020-09-17',
      };

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers,
      });

      const data = await response.json();

      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching company data.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
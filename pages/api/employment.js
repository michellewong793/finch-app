import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { individual_id } = req.body;

      const apiUrl = 'https://sandbox.tryfinch.com/api/employer/employment';
      const cookies = parse(req.headers.cookie || '');
      const accessToken = cookies.access_token || '';
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Finch-API-Version': '2020-09-17',
      };

      const requestData = {
        requests: [
          {
            individual_id,
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log("employment", responseData)

      res.status(response.status).json(responseData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while making the API call.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
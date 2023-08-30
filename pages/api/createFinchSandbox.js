import { parse, serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { provider_id, products, employee_size } = req.body;

      // Perform necessary validation on provider_id if needed

      const apiUrl = 'https://sandbox.tryfinch.com/api/sandbox/create';
      const headers = {
        'Content-Type': 'application/json',
      };

      const requestData = {
        provider_id,
        products,
        employee_size,
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.access_token) {
        const accessTokenCookie = serialize('access_token', data.access_token, {
          httpOnly: true,
          path: '/',
        });

        res.setHeader('Set-Cookie', accessTokenCookie);
      }

      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error creating sandbox:', error);
      res.status(500).json({ error: 'An error occurred while creating the sandbox.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
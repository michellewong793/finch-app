import { useEffect, useState } from 'react';

export default function SomePage() {
  const [accessToken, setAccessToken] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('/api/accessAccessToken', {
          method: 'GET',
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleFetchCompanyData = async () => {
    try {
      const response = await fetch('/api/fetchCompanyData', {
        method: 'GET',
      })
     

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h1>Access Token</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>Loading...</p>
      )}

<button onClick={handleFetchCompanyData}>Fetch Company Data</button>
      {data ? (
        <div>
          <h2>Company Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data fetched yet.</p>
      )}
    </div>
  );
}
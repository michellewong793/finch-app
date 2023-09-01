import { useState } from 'react';
import Directory from './components/Individual';
import styles from './components/styles.module.css'
import Nav from './components/Nav';

const providers = ['gusto', 'adp_run', 'bamboo_hr', 'bamboo_hr_api', 'bob', 'humaans', 'insperity'];

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [directoryData, setDirectoryData] = useState(null);
  const [individualData, setIndividualData] = useState(null);
  const [employmentData, setEmploymentData] = useState(null);
  const [sandboxCreated, setSandboxCreated] = useState(false);
  const [isFetchCompanyDataImplemented, setIsFetchCompanyDataImplemented] = useState(true);
  const [isFetchCompanyDirectoryImplemented, setIsFetchCompanyDirectoryImplemented] = useState(true);

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  const handleFetchCompanyData = async () => {
    try {
      const response = await fetch('/api/fetchCompanyData', {
        method: 'GET',
      });

      if (response.status === 501) {
        setIsFetchCompanyDataImplemented(false);
      } else {
        setIsFetchCompanyDataImplemented(true);
        const responseData = await response.json();
        setCompanyData(responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFetchCompanyDirectory = async () => {
    try {
      const response = await fetch('/api/fetchCompanyDirectory', {
        method: 'GET',
      });

      if (response.status === 501) {
        setIsFetchCompanyDirectoryImplemented(false);
      } else {
        setIsFetchCompanyDirectoryImplemented(true);
        const responseData = await response.json();
        setDirectoryData(responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSandbox = async () => {
    try {
      const response = await fetch('/api/createFinchSandbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: selectedProvider,
          products: ["company", "directory", "individual", "employment"],
          employee_size: 27,
        }),
      });

      const data = await response.json();
      console.log(data); // Handle the response as needed
      setSandboxCreated(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <select value={selectedProvider} onChange={handleProviderChange}>
        <option value="">Select a provider</option>
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
      <button onClick={handleCreateSandbox}>Create Finch Sandbox with selected provider</button>

      <button onClick={handleFetchCompanyData}>Fetch Company Data</button>
      {!isFetchCompanyDataImplemented && <p>The company data endpoint is not implemented for this provider.</p>}

      <button onClick={handleFetchCompanyDirectory}>Fetch Company Directory</button>
      {!isFetchCompanyDirectoryImplemented && <p>The company directory endpoint is not implemented for this provider.</p>}

      <div className={styles.flexRow}>
        <div className={styles.column}>
          {sandboxCreated ? <p>Sandbox Successfully Created! Check out company data, directory for more.</p> : <p>No sandbox created yet. Choose a provider to see more.</p>}

          {directoryData ? (
            <Directory directoryData={directoryData} />
          ) : (
            <p> Try looking up the directory. </p>
          )}

          {companyData ? (
            <div className={styles.companyData}>
              {/* Company data rendering */}
            </div>
          ) : (
            <p>Try fetching company data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
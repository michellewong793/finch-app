import { useState } from 'react';
import Directory from './components/Individual';
import styles from './components/styles.module.css'

const providers = ['gusto', 'adp_run', 'bamboo_hr', 'bamboo_hr_api', 'bob', 'humaans', 'insperity', "justworks",
"namely",
"paychex_flex",
"paychex_flex_api",
"paycom",
"paycom_api",
"paylocity",
"paylocity_api",
"personio",
"quickbooks",
"rippling",
"sage_hr",
"sapling",
"sequoia_one",
"square_payroll",
"trinet",
"trinet_api",
"ulti_pro",
"wave",
"workday",
"zenefits",
"zenefits_api"];

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [directoryData, setDirectoryData] = useState(null);
  const [individualData, setIndividualData] = useState(null);
  const [employmentData, setEmploymentData] = useState(null);
  const [sandboxCreated, setSandboxCreated] = useState(false);
  const [isFetchCompanyDataImplemented, setIsFetchCompanyDataImplemented] = useState(true);
  const [isFetchCompanyDirectoryImplemented, setIsFetchCompanyDirectoryImplemented] = useState(true);
  const [isCreatingSandbox, setIsCreatingSandbox] = useState(false);


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
      setIsCreatingSandbox(true); // Set the loading state

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
      setIsCreatingSandbox(false); // Reset the loading state when done
    } catch (error) {
      console.error('Error:', error);
      setIsCreatingSandbox(false); // Reset the loading state on error
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h1> Welcome to the Finch sandbox demo! </h1>
      <a href="https://github.com/michellewong793/finch-app">View Github repository</a>
      <br/>
      <br/>
      {sandboxCreated ? <p>Sandbox Successfully Created! Check out company data, directory for more.</p> : <p>No sandbox created yet. Choose a provider to see more.</p>}

      <div className={styles.actionRow}>

      <select  className={styles.button} value={selectedProvider} onChange={handleProviderChange}>
        <option value="">Select a provider</option>
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
      <button className={styles.button} onClick={handleCreateSandbox} disabled={isCreatingSandbox}>
        {isCreatingSandbox ? 'Creating Sandbox...' : 'Create Finch Sandbox with selected provider'}
      </button>
      <button  className={styles.button} onClick={handleFetchCompanyData}>Fetch Company Data</button>
      {!isFetchCompanyDataImplemented && <p>The company data endpoint is not implemented for this provider.</p>}

      <button  className={styles.button} onClick={handleFetchCompanyDirectory}>Fetch Company Directory</button>
      {!isFetchCompanyDirectoryImplemented && <p>The company directory endpoint is not implemented for this provider.</p>}
      </div>
      <div className={styles.flexRow}>
        <div className={styles.column}>

        
{companyData ? (
        <div className={styles.companyData}>
          <div>
  <h1>Company Data</h1>
  <p><strong>ID:</strong> {companyData.id}</p>
  <p><strong>Legal Name:</strong> {companyData.legal_name}</p>
  <p><strong>EIN:</strong> {companyData.ein}</p>
  <p><strong>Primary Email:</strong> {companyData.primary_email}</p>
  <p><strong>Primary Phone Number:</strong> {companyData.primary_phone_number}</p>

  <h2>Departments:</h2>
  <ul>
    {companyData.departments.map((department, index) => (
      <li key={index}>{department.name}</li>
    ))}
  </ul>

  <h2>Locations:</h2>
  <ul>
    {companyData.locations.map((location, index) => (
      <li key={index}>
        <strong>Line 1:</strong> {location.line1}<br />
        <strong>Line 2:</strong> {location.line2}<br />
        <strong>City:</strong> {location.city}<br />
        <strong>State:</strong> {location.state}<br />
        <strong>Postal Code:</strong> {location.postal_code}<br />
        <strong>Country:</strong> {location.country}<br />
      </li>
    ))}
  </ul>

  <h2>Accounts:</h2>
  <ul>
    {companyData.accounts.map((account, index) => (
      <li key={index}>
        <strong>Institution Name:</strong> {account.institution_name}<br />
        <strong>Account Number:</strong> {account.account_number}<br />
        <strong>Account Type:</strong> {account.account_type}<br />
        <strong>Routing Number:</strong> {account.routing_number}<br />
      </li>
    ))}
  </ul>
</div>
        </div>
      ) : (
        <p>Try fetching company data.</p>
      )}
        {directoryData ? (
            <Directory directoryData={directoryData} />
          ) : (
            <p> Try looking up the directory. </p>
          )}

           
        </div>
      </div>
    </div>
  );
}
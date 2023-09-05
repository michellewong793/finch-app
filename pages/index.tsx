import { useState } from 'react';
import Directory, {DirectoryData}  from './components/Individual';

import styles from './components/styles.module.css'
import Image from 'next/image'

interface CompanyData {
  id: string | null | undefined;
  legal_name: string | null | undefined;
  ein: string | null | undefined;
  primary_email: string | null | undefined;
  primary_phone_number: string | null | undefined;
  departments: Array<{ name: string | null | undefined }>;
  locations: Array<{
    line1: string | null | undefined;
    line2: string | null | undefined;
    city: string | null | undefined;
    state: string | null | undefined;
    postal_code: string | null | undefined;
    country: string | null | undefined;
  }>;
  accounts: Array<{
    institution_name: string | null | undefined;
    account_number: string | null | undefined;
    account_type: string | null | undefined;
    routing_number: string | null | undefined;
  }>;
}

const providers:string[] = ['gusto', 'adp_run', 'bamboo_hr', 'bamboo_hr_api', 'bob', 'humaans', 'insperity', "justworks",
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
  const [selectedProvider, setSelectedProvider] = useState<string>(''); 
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [directoryData, setDirectoryData] = useState<DirectoryData | null>(null); 
  const [sandboxCreated, setSandboxCreated] = useState<boolean>(false); 
  const [isFetchCompanyDataImplemented, setIsFetchCompanyDataImplemented] = useState<boolean>(true); 
  const [isFetchCompanyDirectoryImplemented, setIsFetchCompanyDirectoryImplemented] = useState<boolean>(true); 
  const [isCreatingSandbox, setIsCreatingSandbox] = useState<boolean>(false);
  const [companyDataFetched, setCompanyDataFetched] = useState<boolean>(false); 
  const [companyDirectoryFetched, setCompanyDirectoryFetched] = useState<boolean>(false); 



  const clearData = () => {
    setCompanyData(null);
    setDirectoryData(null);
    setCompanyDataFetched(false);
    setCompanyDirectoryFetched(false);
    setSandboxCreated(false);
  };

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
    clearData(); // Clear data when a new provider is selected
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
        console.log("company data", responseData)
        setCompanyData(responseData);
        setCompanyDataFetched(true);
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
        setCompanyDirectoryFetched(true);
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
      <Image src="/logo.svg" alt="finch logo" height={100} width={100}/>
      <h1 className={styles.bounce}> Welcome to the Finch sandbox demo! </h1>
      <a className={styles.bounce} href="https://github.com/michellewong793/finch-app">View code</a>
      <br/>
      <br/>
      {sandboxCreated ? <p className={styles.success}>Created sandbox with <b>{selectedProvider}!</b> Check out company data, directory for more.</p> : <p>No sandbox created yet. Create a sandbox to see more.</p>}
      {companyDataFetched ? <p className={styles.success}>{"Company data fetched!"}</p>: <></>}
      <p className={styles.success}>{companyDirectoryFetched ? "Company directory fetched!" : ""}</p>
      {!isFetchCompanyDataImplemented && <p className={styles.error}>The company data endpoint is not implemented for this provider.</p>}
      {!isFetchCompanyDirectoryImplemented && <p className={styles.error}>The company directory endpoint is not implemented for this provider.</p>}

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
        {isCreatingSandbox ? 'Creating.. please wait a moment :)' : 'Create Sandbox'}
      </button>
      <button  className={styles.button} onClick={handleFetchCompanyData}>Get Company Data</button>

      <button  className={styles.button} onClick={handleFetchCompanyDirectory}>Get Company Directory</button>
      </div>
      <div className={styles.flexRow}>
        <div className={styles.column}>

        
        {companyData !== null && (
  <div className={styles.companyData}>
    <div>
    <h2>Company Data</h2>
                <p><strong>ID:</strong> {companyData.id || 'N/A'}</p>
                <p><strong>Legal Name:</strong> {companyData.legal_name || 'N/A'}</p>
                <p><strong>EIN:</strong> {companyData.ein || 'N/A'}</p>
                <p><strong>Primary Email:</strong> {companyData.primary_email || 'N/A'}</p>
                <p><strong>Primary Phone Number:</strong> {companyData.primary_phone_number || 'N/A'}</p>

      <h3>Departments:</h3>
      <ul>
        {companyData.departments !== null ? companyData.departments.map((department, index) => (
          <li key={index}>{department.name || 'N/A'}</li>
        )) : <p> No department data found</p>}
      </ul>

      <h3>Locations:</h3>
      <ul>
        {companyData.locations !== null ? companyData.locations.map((location, index) => (
           <li key={index}>
           <strong>Line 1:</strong> {location.line1 || 'N/A'}<br />
           <strong>Line 2:</strong> {location.line2 || 'N/A'}<br />
           <strong>City:</strong> {location.city || 'N/A'}<br />
           <strong>State:</strong> {location.state || 'N/A'}<br />
           <strong>Postal Code:</strong> {location.postal_code || 'N/A'}<br />
           <strong>Country:</strong> {location.country || 'N/A'}<br />
         </li>
        )) : <p> No company location data found</p>}
      </ul>

      <h3>Accounts:</h3>
      <ul>
        {companyData.accounts !== null ? companyData.accounts.map((account, index) => (
          <li key={index}>
            <strong>Institution Name:</strong> {account.institution_name}<br />
            <strong>Account Number:</strong> {account.account_number}<br />
            <strong>Account Type:</strong> {account.account_type}<br />
            <strong>Routing Number:</strong> {account.routing_number}<br />
          </li>
        )) : <p> No company account data found </p>}
      </ul>
    </div>
  </div>
)}
     {directoryData != null && <Directory directoryData={directoryData} />}


           
        </div>
      </div>
    </div>
  );
}
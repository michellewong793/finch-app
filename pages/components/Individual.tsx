import { useState } from 'react';
import IndividualResults from './IndividualResults';
import styles from './styles.module.css';
import IndividualEmploymentDetails from './IndividualEmploymentDetails';

export interface Individual {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  manager: {
    id: string;
  };
  department: {
    name: string;
  };
  is_active: boolean;
}

// Define an interface for the shape of directoryData
export interface DirectoryData {
  individuals: Individual[];
  // Add other properties if directoryData has more fields
}

function Directory({ directoryData }: { directoryData: DirectoryData }) {
  const [selectedIndividual, setSelectedIndividual] = useState<Individual | null>(null);
  const [individualData, setIndividualData] = useState(null)
  const [employmentDetails, setEmploymentDetails] = useState(null)

  const handleReturnAllInformation = async (individual: Individual) => {
    if (directoryData.individuals.some((i) => i.id === individual.id)) {
      setSelectedIndividual(individual);
  
      try {
        const [individualResponse, employmentResponse] = await Promise.all([
          fetch('/api/individual', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ individual_id: individual.id }),
          }),
          fetch('/api/employment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ individual_id: individual.id }),
          }),
        ]);
  
        const individualData = await individualResponse.json();
        console.log(individualData);
        setIndividualData(individualData.responses);
  
        const employmentData = await employmentResponse.json();
        console.log(employmentData);
        setEmploymentDetails(employmentData.responses[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Selected individual not found in directoryData.');
    }
  };

  
  


  return (
    <>   <div className={styles.flexColumn}>
      <h2>Directory</h2>
      <p>Click on any individual to see more details.</p>
      </div>
    <div className={styles.flexRow}>
      
      <div className={styles.directory}>
      {directoryData ? (
        directoryData.individuals.map((individual, index) => (
          <div key={index}>
            <h3><a className={styles.link} onClick={() => handleReturnAllInformation(individual)}>
              
            Individual {index + 1}</a></h3>
            
            <p><strong>ID:</strong> {individual.id}</p>
            <p><strong>First Name:</strong> {individual.first_name}</p>
            <p><strong>Middle Name:</strong> {individual.middle_name}</p>
            <p><strong>Last Name:</strong> {individual.last_name}</p>
            <p><strong>Manager ID:</strong> {individual.manager.id || "n/a"}</p>
            <p><strong>Department Name:</strong> {individual.department.name}</p>
            <p><strong>Is Active:</strong> {individual.is_active ? 'Yes' : 'No'}</p>
          </div>
        ))
      ) : (
        <p>None fetched yet</p>
      )}
      </div>
      <div>
        {individualData && <IndividualResults responses={individualData} />}
        {employmentDetails && <IndividualEmploymentDetails responses={employmentDetails} />}
      </div>
    </div>
    </>
  );
      }

export default Directory;
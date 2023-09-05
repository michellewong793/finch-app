import React from 'react';

import styles from './styles.module.css';

// Define an interface for the shape of an individual's email or phone number
interface ContactInfo {
  data: string;
  type: string;
}

// Define an interface for the shape of an individual's residence
interface Residence {
  line1: string | null; // Update to accept null values
  line2: string | null; // Update to accept null values
  city: string | null; // Update to accept null values
  state: string | null; // Update to accept null values
  postal_code: string | null; // Update to accept null values
  country: string | null; // Update to accept null values
}

// Define an interface for the shape of an individual's response
interface IndividualResponseData {
  id: string | null;
  first_name: string | null; // Update to accept null values
  middle_name: string | null; // Update to accept null values
  last_name: string | null; // Update to accept null values
  dob: string | null; // Update to accept null values
  gender: string | null; // Update to accept null values
  emails: (ContactInfo | null)[]; // Update to accept null values
  phone_numbers: (ContactInfo | null)[]; // Update to accept null values
  residence: Residence;
}

// Define the props interface for the IndividualResponse component
interface IndividualResponseProps {
  response: {
    body: IndividualResponseData | null; // Update to accept null values
  };
}

function IndividualResponse({ response }: IndividualResponseProps) {
  const individual = response.body;

  if (!individual) {
    return <p>N/A</p>;
  }

  return (
    <div className={styles.individualResults}>
      <h2>Individual Information</h2>
      <p><strong>ID:</strong> {individual.id || "N/A"}</p>
      <p><strong>First Name:</strong> {individual.first_name || "N/A"}</p>
      <p><strong>Middle Name:</strong> {individual.middle_name || "N/A"}</p>
      <p><strong>Last Name:</strong> {individual.last_name || "N/A"}</p>
      <p><strong>Date of Birth:</strong> {individual.dob || "N/A"}</p>
      <p><strong>Gender:</strong> {individual.gender || "N/A"}</p>

      <h3>Emails</h3>
      {individual.emails !== null && individual.emails.length > 0 ? (
        <ul>
          {individual.emails.map((email, index) => (
            <li key={index}>{email ? `${email.data} (${email.type})` : "N/A"}</li>
          ))}
        </ul>
      ) : (
        <p>N/A</p>
      )}


      <h3>Phone Numbers</h3>
      <ul>
  {individual !== null && individual.phone_numbers ? (
    individual.phone_numbers.map((phone, index) => (
      <li key={index}>{phone ? `${phone.data} (${phone.type})` : "N/A"}</li>
    ))
  ) : (
   <li> <p>No phone numbers available</p></li>
  )}
</ul>

      <h3>Residence</h3>
      <p><strong>Address:</strong> {individual.residence.line1 || "N/A"}, {individual.residence.line2 || "N/A"}</p>
      <p><strong>City:</strong> {individual.residence.city || "N/A"}</p>
      <p><strong>State:</strong> {individual.residence.state || "N/A"}</p>
      <p><strong>Postal Code:</strong> {individual.residence.postal_code || "N/A"}</p>
      <p><strong>Country:</strong> {individual.residence.country || "N/A"}</p>
    </div>
  );
}

interface IndividualResponseListProps {
  responses?: {
    body: IndividualResponseData | null; // Update to accept null values
  }[];
}

function IndividualResponseList({ responses }: IndividualResponseListProps) {
  return (
    <div>
      {responses && responses.length > 0 ? (
        responses.map((response, index) => (
          <IndividualResponse key={index} response={response || { body: null }} />
        ))
      ) : (
        <p>No individual responses available.</p>
      )}
    </div>
  );
}

export default IndividualResponseList;
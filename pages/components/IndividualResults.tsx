import React from 'react';

import styles from './styles.module.css';

// Define an interface for the shape of an individual's email or phone number
interface ContactInfo {
  data: string;
  type: string;
}

// Define an interface for the shape of an individual's residence
interface Residence {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Define an interface for the shape of an individual's response
interface IndividualResponseData {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  gender: string;
  emails: ContactInfo[];
  phone_numbers: ContactInfo[];
  residence: Residence;
}

// Define the props interface for the IndividualResponse component
interface IndividualResponseProps {
  response: {
    body: IndividualResponseData;
  };
}

function IndividualResponse({ response }: IndividualResponseProps) {
  const individual = response.body;

  return (
    <div className={styles.individualResults}>
      <h2>Individual Information</h2>
      <p><strong>ID:</strong> {individual.id}</p>
      <p><strong>First Name:</strong> {individual.first_name}</p>
      <p><strong>Middle Name:</strong> {individual.middle_name}</p>
      <p><strong>Last Name:</strong> {individual.last_name}</p>
      <p><strong>Date of Birth:</strong> {individual.dob}</p>
      <p><strong>Gender:</strong> {individual.gender}</p>

      <h3>Emails</h3>
      <ul>
        {individual.emails.map((email, index) => (
          <li key={index}>{email.data} ({email.type})</li>
        ))}
      </ul>

      <h3>Phone Numbers</h3>
      <ul>
        {individual.phone_numbers.map((phone, index) => (
          <li key={index}>{phone.data} ({phone.type})</li>
        ))}
      </ul>

      <h3>Residence</h3>
      <p><strong>Address:</strong> {individual.residence.line1}, {individual.residence.line2}</p>
      <p><strong>City:</strong> {individual.residence.city}</p>
      <p><strong>State:</strong> {individual.residence.state}</p>
      <p><strong>Postal Code:</strong> {individual.residence.postal_code}</p>
      <p><strong>Country:</strong> {individual.residence.country}</p>
    </div>
  );
}

interface IndividualResponseListProps {
  responses: {
    body: IndividualResponseData;
  }[];
}

function IndividualResponseList({ responses }: IndividualResponseListProps) {
  return (
    <div>
      {responses.map((response, index) => (
        <IndividualResponse key={index} response={response} />
      ))}
    </div>
  );
}

export default IndividualResponseList;
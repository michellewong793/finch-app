import React from 'react';

import styles from './styles.module.css';

function IndividualResponse({ response }) {
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

function IndividualResponseList({ responses }) {
  return (
    <div>
      {responses.map((response, index) => (
        <IndividualResponse key={index} response={response} />
      ))}
    </div>
  );
}

export default IndividualResponseList;
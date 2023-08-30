import React from 'react';

function IndividualDetails({ responses }) {
  const individual = responses.body


  return (
    <div>
      <h2>Employment Information</h2>
      <p><strong>ID:</strong> {individual.id}</p>
      <p><strong>First Name:</strong> {individual.first_name}</p>
      <p><strong>Middle Name:</strong> {individual.middle_name}</p>
      <p><strong>Last Name:</strong> {individual.last_name}</p>
      <p><strong>Title:</strong> {individual.title}</p>
      <p><strong>Manager ID:</strong> {individual.manager.id}</p>
      <p><strong>Employment Type:</strong> {individual.employment.type}</p>
      <p><strong>Department Name:</strong> {individual.department.name}</p>
      <p><strong>Start Date:</strong> {individual.start_date}</p>
      <p><strong>End Date:</strong> {individual.end_date || 'N/A'}</p>
      <p><strong>Is Active:</strong> {individual.is_active ? 'Yes' : 'No'}</p>
      <p><strong>Class Code:</strong> {individual.class_code}</p>
      <p><strong>Location:</strong> {individual.location.line1}, {individual.location.line2}, {individual.location.city}, {individual.location.state}, {individual.location.postal_code}, {individual.location.country}</p>
      <p><strong>Income:</strong> {individual.income.amount} {individual.income.currency} per {individual.income.unit}</p>
      
      <h3>Income History</h3>
      <ul>
        {individual.income_history && individual.income_history.map((income, index) => (
          <li key={index}>
            {income.amount} {income.currency} per {income.unit} as of {income.effective_date}
          </li>
        ))}
      </ul>
      
      <h3>Custom Fields</h3>
      {individual.custom_fields !== null ? (
        <ul>
          {individual.custom_fields.map((field, index) => (
            <li key={index}>
              <strong>{field.name}:</strong> {field.value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No custom fields available</p>
      )}
    </div>
  );
}

export default IndividualDetails;
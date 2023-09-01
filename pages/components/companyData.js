import styles from './styles.module.css'

export default function CompanyData(companyData) {
  return (
    <div>
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
</div>
  );
}

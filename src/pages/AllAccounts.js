import React, { useState, useEffect } from 'react';
import './AllAccounts.css';

function AllAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/accounts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setAccounts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching accounts:', err);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <div className="loading">Loading accounts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="accounts-container">
      <h1>All Accounts</h1>
      
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <div className="table-container">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>{account.username}</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>${account.balance?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllAccounts;

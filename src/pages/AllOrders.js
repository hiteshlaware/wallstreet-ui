import React, { useState, useEffect } from 'react';
import './AllOrders.css';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/accounts/1001/orders');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('orders fetched:', data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Account Name</th>
                <th>Username</th>
                <th>Symbol</th>
                <th>Order Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.account.name}</td>
                  <td>{order.account.username}</td>
                  <td>{order.security.symbol}</td>
                  <td>{order.orderType}</td>
                  <td>${order.price?.toFixed(2)}</td>
                  <td>{order.quantity}</td>
                  <td>${order.amount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllOrders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserHome.css';

function UserHome() {
  const [orderType, setOrderType] = useState('BUY');
  const [targetType, setTargetType] = useState('Shares');
  const [symbol, setSymbol] = useState('');
  const [target, setTarget] = useState('');
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get('/api/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        accountId: 1,
        symbol,
        orderType,
        targetType,
        target: parseFloat(target)
      };
      await axios.post('http://localhost:8080/api/orders', orderData);
      // Refresh portfolio after order
      fetchPortfolio();
      // Reset form
      setSymbol('');
      setTarget('');
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const handleSell = async (securityId) => {
    try {
      const portfolioItem = portfolio.find(item => item.securityId === securityId);
      if (portfolioItem) {
        await axios.post('/api/orders', {
          symbol: portfolioItem.symbol,
          orderType: 'SELL',
          targetType: 'Shares',
          target: portfolioItem.quantity
        });
        fetchPortfolio();
      }
    } catch (error) {
      console.error('Error selling position:', error);
    }
  };

  return (
    <div className="user-home">
      <section className="trade-section">
        <h2>Trade</h2>
        <form onSubmit={handleTradeSubmit}>
          <div className="form-group">
            <label>Symbol:</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="toggle-group">
            <div className="toggle-buttons">
              <button
                type="button"
                className={orderType === 'BUY' ? 'active' : ''}
                onClick={() => setOrderType('BUY')}
              >
                Buy
              </button>
              <button
                type="button"
                className={orderType === 'SELL' ? 'active' : ''}
                onClick={() => setOrderType('SELL')}
              >
                Sell
              </button>
            </div>
          </div>

          <div className="toggle-group">
            <div className="toggle-buttons">
              <button
                type="button"
                className={targetType === 'Shares' ? 'active' : ''}
                onClick={() => setTargetType('Shares')}
              >
                Shares
              </button>
              <button
                type="button"
                className={targetType === 'Dollars' ? 'active' : ''}
                onClick={() => setTargetType('Dollars')}
              >
                Dollars
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>{targetType === 'Shares' ? 'Number of Shares:' : 'Dollar Amount:'}</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              min="0"
              step={targetType === 'Shares' ? '1' : '0.01'}
              required
            />
          </div>

          <button type="submit" className="process-order-btn">
            Process Order
          </button>
        </form>
      </section>

      <section className="portfolio-section">
        <h2>Portfolio</h2>
        <table>
          <thead>
            <tr>
              <th>Security ID</th>
              <th>Account ID</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((item) => (
              <tr key={`${item.accountId}-${item.securityId}`}>
                <td>{item.securityId}</td>
                <td>{item.accountId}</td>
                <td>{item.quantity}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleSell(item.securityId)}
                    className="sell-btn"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserHome;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllAccounts from './pages/AllAccounts';
import AllOrders from './pages/AllOrders';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';

function App() {

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">Wallstreet UI</div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/accounts" className="nav-link">All Accounts</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">All Orders</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/accounts" element={<AllAccounts />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

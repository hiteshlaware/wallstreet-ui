import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import AllAccounts from './pages/AllAccounts';
import AllOrders from './pages/AllOrders';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Wallstreet UI</div>
      <ul className="navbar-nav">
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/accounts" className="nav-link">All Accounts</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">All Orders</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
            </li>
            <li className="welcome-message">
              Welcome, {currentUser.name || currentUser.username}
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-account" className="nav-link">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/accounts" element={<AllAccounts />} />
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/home" element={<UserHome />} />
          </Route>
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

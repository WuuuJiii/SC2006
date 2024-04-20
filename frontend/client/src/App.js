import React, {useState, useEffect} from 'react';

import {jwtDecode} from 'jwt-decode';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import FAQ from './pages/FAQ'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Explore from './pages/Explore';
import ShowProperty from './pages/ShowProperty';

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  // Check the token right away
  checkToken();

  // Check the token every second
  const intervalId = setInterval(checkToken, 60 * 1000);

  // Clean up the interval on unmount
  return () => clearInterval(intervalId);
}, []);




  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/> : <Navigate to="/login" />} />          
          <Route path="/FAQ" element={<FAQ isAuthenticated={isAuthenticated}/>} />
          <Route path="/login/forget-password" element={<ForgetPassword />} />
          <Route path="/explore" element={<Explore isAuthenticated={isAuthenticated}/>} />
          <Route path="/property" element={<ShowProperty isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

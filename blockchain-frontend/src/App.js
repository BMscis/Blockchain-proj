import React from 'react';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CommunityHub from './components/CommunityHub';
import Membership from './components/Membership';
import Services from './components/Services';
import JoinNow from './components/JoinNow';
import contact from './components/contact';
import Footer from './components/Footer';
import './index.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/About" element={<AboutUs/>} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/contact" element={<contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<JoinNow />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Footer /> {/* Include the Footer component outside of the Routes */}
    </Router>
  );
};

export default App;

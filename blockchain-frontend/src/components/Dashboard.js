// components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if not already installed
/* import TransactionForm from './TransactionForm'; */
/* import FinancialReports from './FinancialReports';
import CommunicationHub from './CommunicationHub'; */

const Dashboard = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/membership">Membership</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/community">Community Hub</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <div>
       
          <p>ABC ensures secure transactions to safeguard your financial activities.<span>njoy the convenience of automated record-keeping, reducing manual effort and errors.</span>ABC provides transparent financial reports, fostering trust and understanding among community members.</p>
        </div>
       
         
        </div>
        
     
  );  
};

export default Dashboard;

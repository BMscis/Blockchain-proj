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
      <div className="feature-section">
        <h2>ABC Features</h2>
        <div className="feature-card">
          <h3>Secure Transactions</h3>
          <p>ABC ensures secure transactions to safeguard your financial activities.</p>
        </div>
        <div className="feature-card">
          <h3>Automated Record-Keeping</h3>
          <p>Enjoy the convenience of automated record-keeping, reducing manual effort and errors.</p>
        </div>
        <div className="feature-card">
          <h3>Transparent Community Reporting</h3>
          <p>ABC provides transparent financial reports, fostering trust and understanding among community members.</p>
        </div>
      </div>
    </div>
  );

      {/* Content section based on user's choice */}
      {/* For simplicity, I'm rendering TransactionForm as default */}
   {/*    <TransactionForm /> */}
  
  
};

export default Dashboard;

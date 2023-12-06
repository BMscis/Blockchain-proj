// components/Membership.js
import React, { useState } from 'react';
import './Membership.css'; // Import the CSS file

const Membership = () => {
  const [isMember, setIsMember] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');

  const handleJoinMembership = () => {
    // Implement logic to handle the membership join action
    // For example, you might interact with the smart contract to add the user as a member
    // Update state or UI accordingly
    setIsMember(true);
  };

  const renderDashboardContent = () => {
    switch (selectedTab) {
      case 'home':
        return <p>Welcome to your Membership Dashboard!</p>;
      case 'transaction':
        return <p>View your Transaction History here.</p>;
      case 'wallet':
        return <p>Manage your Wallet and transactions.</p>;
      case 'invite':
        return <p>Invite Members to join the community.</p>;
      case 'community':
        return <p>Connect with the Community.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="membership-container">
      <h2 className="membership-title">Membership Dashboard</h2>
      {isMember ? (
        <>
          <nav className="dashboard-nav">
            <button onClick={() => setSelectedTab('home')}>Home</button>
            <button onClick={() => setSelectedTab('transaction')}>Transaction History</button>
            <button onClick={() => setSelectedTab('wallet')}>Wallet</button>
            <button onClick={() => setSelectedTab('invite')}>Invite Members</button>
            <button onClick={() => setSelectedTab('community')}>Community</button>
          </nav>
          <div className="dashboard-content">
            {renderDashboardContent()}
          </div>
        </>
      ) : (
        <>
          <p className="membership-description">
            Join our membership to access exclusive benefits:
          </p>
          <ul className="membership-list">
            <li>Access to special events</li>
            <li>Discounts on services</li>
            <li>Community support</li>
          </ul>
          <button className="membership-button" onClick={handleJoinMembership}>
            Join Membership
          </button>
        </>
      )}
    </div>
  );
};

export default Membership;

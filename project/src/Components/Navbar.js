import React from 'react';
import './Navbar.css'; // Make sure this path is correct
import TitleIcon from './TitleIcon.png'; // Ensure this path is correct too

function Navbar({ onLoginClick }) {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={TitleIcon} alt="Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-section">
        {/* onLoginClick is called when the login button is clicked */}
        <button onClick={onLoginClick}>Login</button>
        <button>Settings</button>
      </div>
    </div>
  );
}

export default Navbar;

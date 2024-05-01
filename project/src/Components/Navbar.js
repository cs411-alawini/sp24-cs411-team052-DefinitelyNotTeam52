import React from 'react';
import './Navbar.css'; // Make sure this path is correct
import TitleIcon from './TitleIcon.png'; // Ensure this path is correct too
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={TitleIcon} alt="Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-section">
      <Link to="/" style={{ marginRight: '20px' }} className='btn btn-primary'>Home</Link>
      <Link to="/add" style={{ marginRight: '20px' }} className='btn btn-primary'>Add</Link>
      <Link to="/modify" style={{ marginRight: '20px' }} className='btn btn-primary'>Modify</Link>
      <Link to="/delete" style={{ marginRight: '20px' }} className='btn btn-primary'>Delete</Link>
      </div>
    </div>
  );
}

export default Navbar;

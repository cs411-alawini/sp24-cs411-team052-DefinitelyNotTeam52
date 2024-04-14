import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map.js';  
import Navbar from './Components/Navbar.js'; 
import Sidebar from './Components/Sidebar.js'; 
import LoginModal from './Components/Login'; 

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setLoginModalOpen(false);
    };

    return (
      <div className="App">
        <header className="App-header">
          <Navbar onLoginClick={handleLoginClick} />
          <div className="main-content">
            <Sidebar />
            <div className="map-table-container">
              <Map />
            </div>
          </div>
        </header>
        {/* Conditionally render the LoginModal based on isLoginModalOpen */}
        {isLoginModalOpen && (
          <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
        )}
      </div>
    );
}

export default App;

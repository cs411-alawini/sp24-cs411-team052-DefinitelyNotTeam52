import React from 'react';
import './App.css';
import Map from './Components/Map.js';  
import Navbar from './Components/Navbar.js'; 
import Sidebar from './Components/Sidebar.js'; 

function App() {
  const handleClick = () => {
    alert('你好，世界！');
  };

  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="map-table-container">
                    <Map />
                </div>
            </div>
        <p>这是一个基础示例。</p>
        <button onClick={handleClick}>点击我</button>
      </header>
    </div>
  );
}

export default App;

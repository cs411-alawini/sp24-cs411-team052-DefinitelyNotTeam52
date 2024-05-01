import React, {useEffect, useRef, useState} from 'react';
import './App.css';
// import './style.css';
import Map from './Components/Map.js';  
import Navbar from './Components/Navbar.js'; 
import Sidebar from './Components/Sidebar.js'; 
import LoginModal from './Components/Login'; 
//import TableView from './Components/TableView';



function App() {
  const [dateRange, setDateRange] = useState({startYear: 2013, endYear: 2022});
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [view, setView] = useState('map'); // 默认视图为地图
  const [queryResults, setQueryResults] = useState(null); // 用于存储查询结果
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 控制侧边栏是否展开的状态
  const mapRef = useRef(null); // 如果你使用 useRef 来引用地图实例

  // 用于处理地图大小调整的副作用
  useEffect(() => {
    if (mapRef.current && window.google && window.google.maps) {
      // 触发 resize 事件
      window.google.maps.event.trigger(mapRef.current, 'resize');
    }
  }, [isSidebarOpen]); // 当 isSidebarOpen 改变时触发

  const handleLoginClick = () => {
      setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
      setLoginModalOpen(false);
  };
  const toggleView = () => {
    setView(view === 'map' ? 'table' : 'map');  // 切换视图
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // 切换侧边栏状态
  };

  const handleDateChange = (start, end, timestamp) => {
    setDateRange({ startYear: start, endYear: end, timestamp });
};

  // 函数用于从后端获取查询结果并设置状态
  const fetchQueryResults = (startYear, endYear, timestamp) => {
    // Ensure that the startYear and endYear are dynamically set from the function arguments
    const timestamp = new Date().getTime(); // Generate a timestamp for cache busting
    const url = `http://localhost:3000/api/query-results?startYear=${startYear}&endYear=${endYear}&_=${timestamp}`;
    
    fetch(url)
      .then(response => {
        console.log('Response received', response.status);
        return response.json(); // Assuming the response is JSON. Adjust if different.
      })
      .then(data => {
        try {
          setQueryResults(data); // Assuming `setQueryResults` is available in the scope to update state

          // Open a new window and write the results to it
          const newWindow = window.open();
          newWindow.document.write(`
            <html>
            <head>
              <title>Results</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h1>Results</h1>
              <table>
                <tr>
                  <th>Company</th>
                  <th>Derailment Rate</th>
                </tr>
                ${data.map(item => `
                  <tr>
                    <td>${item.company}</td>
                    <td>${item.derailment_rate}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
            </html>
          `);
        } catch (error) {
          console.error('Failed to parse JSON:', data);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
};


  
  return (
    <div className={`App ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <header className="App-header">
        <Navbar onLoginClick={handleLoginClick} />
        <button onClick={toggleSidebar} className={`toggle-button ${!isSidebarOpen ? 'collapsed' : ''}`}>
          {isSidebarOpen ? '◀' : '▶'}
        </button>
      </header>
      <div className="main-content">
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            onDateChange={handleDateChange}
            fetchQueryResults={fetchQueryResults}
          />
        </div>
        <Map ref={mapRef} dateRange={dateRange} />
      </div>
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
  
}

export default App;

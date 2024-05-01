import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar
// import './../style.css';
function Sidebar({ isSidebarOpen, fetchQueryResults, onChange}) {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [railroadName, setRailroadName] = useState('');  // 默认为BNSF
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle the submission of the query with the new year filters
    const handleQuery = () => {
        if (parseInt(startYear) > parseInt(endYear)) {
            setErrorMessage('Start year must not be greater than end year.'); 
            return; 
        }
        setErrorMessage('');

        // Here, you can integrate the years into your query function or modify the existing fetchQueryResults
        console.log("Submitting Query with:", startYear, endYear, railroadName);
        const timestamp = new Date().getTime();
        // Call the fetchQueryResults function with parameters and timestamp
        fetchQueryResults(startYear, endYear, railroadName, timestamp); // Example: Adjust this to match your actual fetching logic
    };

    const fetchStoredProcResults = () => {
        console.log("LOL");
        const url = `http://localhost:3000/api/derailment-causes`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        }).then(response => response.json())
            .then(data => {
                console.log('Stored Procedure Data:', data);
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
                  <th>Cause_code</th>
                  <th>Cause_name</th>
                  <th>Derailment Rate</th>
                </tr>
                ${data.message.map(item => `
                  <tr>
                    <td>${item.Cause_Code}</td>
                    <td>${item.Cause_Name}</td>
                    <td>${item.derailment_rate}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
            </html>
          `);
            })
            .catch(error => {
                console.error('Failed to fetch stored procedure data:', error);
                alert('Failed to load data');
            });
    };

    const fetchTopTraffic = () => {
        console.log("LOL");
        const url = `http://localhost:3000/api/top15-traffic`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        }).then(response => response.json())
            .then(data => {
                console.log('Stored Procedure Data:', data);
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
                  <th>Railroad</th>
                  <th>Class</th>
                  <th>Train Miles</th>
                </tr>
                ${data.message.map(item => `
                  <tr>
                    <td>${item.RAILROAD_SUCCESSOR}</td>
                    <td>${item.RRCLASSIFICATION}</td>
                    <td>${item.train_mile}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
            </html>
          `);
            })
            .catch(error => {
                console.error('Failed to fetch stored procedure data:', error);
                alert('Failed to load data');
            });
    };

    const handleUpdateMap = () => {
        if (parseInt(startYear) > parseInt(endYear)) {
            setErrorMessage('Start year must not be greater than end year.');
            return;
        }
        setErrorMessage('');
        console.log("Submitting Query with:", startYear, endYear, railroadName);
        const timestamp = new Date().getTime();
        onChange(startYear, endYear, railroadName, timestamp);
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>

            <li>
                <label>
                    Time Period
                </label>
                <input
                    type="text"
                    placeholder="Start Year (default 2013)"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="End Year (default 2022)"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                />
            </li>

            <li>
                <label>
                    Railroad Company
                </label>
                <input
                    type="text"
                    placeholder="Railroad Company (default BNSF)"
                    value={railroadName}
                    onChange={(e) => setRailroadName(e.target.value)}
                />
            </li>
            
            <button onClick={handleQuery}>
                Load Derailment Rate
            </button>
            <button onClick={fetchStoredProcResults}>
                Load Recent Ten Years' Derailment Causes
            </button>
            <button onClick={fetchTopTraffic}>
                Load Recent Ten Years' Top 15 Traffic
            </button>
            <button onClick={handleUpdateMap}>
                Update Map
            </button>

            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
    );
}

export default Sidebar;
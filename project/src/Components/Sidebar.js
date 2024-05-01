import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar
// import './../style.css';
function Sidebar({ isSidebarOpen, fetchQueryResults, onDateChange}) {
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

    const handleUpdateMap = () => {
        if (parseInt(startYear) > parseInt(endYear)) {
            setErrorMessage('Start year must not be greater than end year.');
            return;
        }
        setErrorMessage('');
        const timestamp = new Date().getTime();
        onDateChange(startYear, endYear, timestamp);
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
                Load Query Results
            </button>

            <button onClick={handleUpdateMap}>
                Update Map
            </button>

            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
    );
}

export default Sidebar;

import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar
// import './../style.css';
function Sidebar({ isSidebarOpen, fetchQueryResults }) {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle the submission of the query with the new year filters
    const handleQuery = () => {
        if (parseInt(startYear) > parseInt(endYear)) {
            setErrorMessage('Start year must not be greater than end year.'); 
            return; 
        }
        if (isNaN(parseInt(startYear, 10)) || isNaN(parseInt(endYear, 10))) {
            setErrorMessage('Please enter valid year numbers.');
            return; 
        }
        setErrorMessage('');

        // Here, you can integrate the years into your query function or modify the existing fetchQueryResults
        console.log(`Fetching data from ${startYear} to ${endYear}`);
        const timestamp = new Date().getTime();
        // Call the fetchQueryResults function with parameters and timestamp
        fetchQueryResults(startYear, endYear, timestamp); // Example: Adjust this to match your actual fetching logic
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

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
                    <input type="checkbox" /> Accident Type
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>
            
            <button onClick={handleQuery}>
                Load Query Results
            </button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
    );
}

export default Sidebar;

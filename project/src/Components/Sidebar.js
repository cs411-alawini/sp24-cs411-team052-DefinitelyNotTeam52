import React from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar
// import './../style.css';
function Sidebar({ isSidebarOpen, fetchQueryResults }) {
    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <li>
                <label>
                    <input type="checkbox" /> State
                </label>
            </li>

            <li>
                <label>
                    <input type="checkbox" /> Time Period
                </label>
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
            
            <button onClick={fetchQueryResults}>
                Load Query Results
            </button>
        </div>
    );
}

export default Sidebar;

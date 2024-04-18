import React from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar

function Sidebar({ isSidebarOpen, fetchQueryResults }) {
    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <ul>
                <h2>State</h2>
                <h2>time period</h2>
                <h2>type</h2>
            </ul>
            <button onClick={fetchQueryResults}>
                Load Query Results
            </button>
        </div>
    );
}

export default Sidebar;

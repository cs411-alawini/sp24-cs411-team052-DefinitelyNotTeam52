import React from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar

function Sidebar({ isSidebarOpen, fetchQueryResults }) {
    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <ul>
                <li>Create New Table</li>
                <li>Create New Map</li>
                <li>Save Current Map</li>
            </ul>
            <button onClick={fetchQueryResults}>
                Load Query Results
            </button>
        </div>
    );
}

export default Sidebar;

import React from 'react';
import './Sidebar.css'; // Assuming you will create a separate CSS file for the Sidebar

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>Create New Table</li>
                <li>Create New Map</li>
                <li>Save Current Map</li>
            </ul>
        </div>
    );
}

export default Sidebar;

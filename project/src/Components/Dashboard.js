import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './Map';

const Dashboard = () => {
    const [startYear, setStartYear] = useState('2013');
    const [endYear, setEndYear] = useState('2022');
    const [accidents, setAccidents] = useState([]);

    useEffect(() => {
        const fetchAccidents = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/accidents?startYear=${startYear}&endYear=${endYear}`);
                const data = await response.json();
                setAccidents(data);
            } catch (error) {
                console.error('Error fetching accidents:', error);
            }
        };

        fetchAccidents();
    }, [startYear, endYear]); // 依赖 startYear 和 endYear

    return (
        <div>
            <Sidebar setStartYear={setStartYear} setEndYear={setEndYear} />
            <MapComponent accidents={accidents} />
        </div>
    );
};

export default Dashboard;

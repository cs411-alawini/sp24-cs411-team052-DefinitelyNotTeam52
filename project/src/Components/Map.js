import React, { forwardRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Map.css'; 

const center = {
  lat: 39.0997,
  lng: -94.5786
};

const MapComponent = forwardRef((props, ref) => {
  const [accidents, setAccidents] = useState([]);
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const { dateRange } = props;

  useEffect(() => {
    const url = `http://localhost:3000/api/accidents?startYear=${dateRange.startYear}&endYear=${dateRange.endYear}&railroadName=${dateRange.railroadName}&_=${dateRange.timestamp}`;    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('API data:', data);  // 查看API返回的数据
        setAccidents(data);
    })
      .catch(error => console.error('Error fetching accidents:', error));
  }, [dateRange]);  // 当 dateRange 改变时重新加载数据


  const handleMouseOver = (accident) => {
    if (timerId) clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      setSelectedAccident(accident);
    }, 1000);  // 三秒后显示信息窗口

    setTimerId(newTimerId);
  };

  const handleMouseOut = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
    setSelectedAccident(null);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBhzfmXlyyjH3UMGM3JvpwFlJHFZZ6j9Ng" // 替换为你的Google Maps API密钥
    >
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={5}
        >
        {accidents.map(accident => (
            <Marker
              key={accident.id}
              position={{ 
              lat: Number(accident.latitude),  // 使用 Number 确保类型正确
              lng: Number(accident.longitude)}}
              onMouseOver={() => handleMouseOver(accident)}
              onMouseOut={handleMouseOut}
            />
          ))}

          {selectedAccident && (
            <InfoWindow
              position={{ lat: selectedAccident.latitude, lng: selectedAccident.longitude }}
              onCloseClick={() => setSelectedAccident(null)}
            >
              <div>
                <h2>Accident Detail</h2>
                <p><strong>Date:</strong> {selectedAccident.date}</p >
                <p><strong>Railroad:</strong> {selectedAccident.railroad}</p >
                <p><strong>Total Derail:</strong> {selectedAccident.total_derail}</p >
                <p><strong>Accident Cause:</strong> {selectedAccident.acc_cause}</p >
              </div>
            </InfoWindow>
          )}
        
      </GoogleMap>
      </div>
    </LoadScript>
  );
});

export default MapComponent;
import React from 'react';
import './Map.css'; // 导入 Map 的 CSS 样式
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const center = {
  lat: 39.0997,
  lng: -94.5786
};


const MapComponent = () => {
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
        { /* 子组件如标记可以放在这里 */ }
        <Marker
          position={center}
        />
      </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default MapComponent;

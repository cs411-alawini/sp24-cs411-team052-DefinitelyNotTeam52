import React from 'react';
import './App.css';
import MapView from './MapView';  // 使用相对路径引入MapView组件

function App() {
  const handleClick = () => {
    alert('你好，世界！');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Railroad Safety and Operation Data Platform</h1>
        <h1>Map</h1>
        <MapView /> 
        <p>这是一个基础示例。</p>
        <button onClick={handleClick}>点击我</button>
      </header>
    </div>
  );
}

export default App;

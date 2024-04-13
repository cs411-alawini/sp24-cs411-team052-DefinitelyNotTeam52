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
        <h1>欢迎来到我的网页</h1>
        <h1>我的地图应用</h1>
        <MapView />  // 在这里渲染地图
        <p>这是一个基础示例。</p>
        <button onClick={handleClick}>点击我</button>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './Navbar.css'; // 导入 Navbar 的 CSS 样式
import TitleIcon from './TitleIcon.png'; // 导入 TitleIcon 组件

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                {/* Logo 的地方 */}
                <img src={TitleIcon} alt="Logo" />
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                {/* 可能还有搜索按钮或图标 */}
            </div>

            <div className="user-section">
                <button>登录</button>
                <button>设置</button>
            </div>

        </div>
    );
}

export default Navbar;

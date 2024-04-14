import React from 'react';
import './Login.css'; // 确保这个路径是正确的

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay"> {/* 使用了 login-modal-overlay 类名 */}
      <div className="login-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>用户登录</h2>
        <form>
          <label htmlFor="username">用户名:</label> {/* 改为 htmlFor */}
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">密码:</label> {/* 改为 htmlFor */}
          <input type="password" id="password" name="password" required />

          <button type="submit" className="login-modal-submit-btn">登录</button> {/* 添加了类名 */}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
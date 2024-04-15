// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./api'); // 导入您的 API 路由

const app = express();

// 应用中间件
app.use(cors());
app.use(bodyParser.json());

// 使用 api.js 中定义的路由
app.use('/api', apiRoutes);

// 其他所有请求，返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 设置端口并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
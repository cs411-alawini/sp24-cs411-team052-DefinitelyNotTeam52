const detectPort = require('detect-port');
const { exec } = require('child_process');

// 假定你的默认前端端口是3000
const DEFAULT_PORT = 3000;

detectPort(DEFAULT_PORT, (err, port) => {
  if (err) {
    console.error('Error detecting port:', err);
    return;
  }

  if (port === DEFAULT_PORT) {
    console.log(`Port ${DEFAULT_PORT} is available, starting the app...`);
    exec(`react-scripts start`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error starting the app:', error);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });
  } else {
    console.log(`Port ${DEFAULT_PORT} is not available, using port ${port} instead.`);
    process.env.PORT = port; // 设置环境变量PORT为检测到的可用端口
    exec(`react-scripts start`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error starting the app:', error);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });
  }
});

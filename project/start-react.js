// start-react.js
const detect = require('detect-port');
const { exec } = require('child_process');

const DEFAULT_PORT = 5000; // 可以设置为你期望的默认端口

detect(DEFAULT_PORT, (err, port) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  if (port === DEFAULT_PORT) {
    console.log(`Port ${DEFAULT_PORT} is available, using it to start the app.`);
  } else {
    console.log(`Port ${DEFAULT_PORT} is occupied, using port ${port} instead.`);
  }

  // 设置环境变量PORT为找到的可用端口
  process.env.PORT = port;

  // 执行React启动脚本
  const reactStartCommand = `react-scripts start`;
  const subprocess = exec(reactStartCommand, { stdio: 'inherit' });

  subprocess.on('exit', process.exit);
});

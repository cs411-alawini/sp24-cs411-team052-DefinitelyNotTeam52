const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  // ... other configurations ...
  host: '34.69.202.105', // GCP SQL instance IP
  user: 'root', // or your specific database user
  database: 'railroad_db', // the specific database name
  password: 'CS411TEAM52', // database user's password
  port: 3306, // default MySQL port
});

// 定义执行查询的函数
function runQuery() {
  pool.query(`
  WITH
        accident AS (
            SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, COUNT(*) AS derailment
            FROM RR_ACCIDENTS
            JOIN RR_CLASS ON RR_ACCIDENTS.RAILROAD = RR_CLASS.RAILROAD
            WHERE RR_CLASS.RRCLASSIFICATION = 1
            AND RR_ACCIDENTS.ACC_TYPE = 1
            AND RR_ACCIDENTS.TRAIN_TYPE = "F"
            AND RR_ACCIDENTS.TRACK_TYPE = "MS"
            AND YEAR(RR_ACCIDENTS.\`DATE\`) >= 2013
            AND YEAR(RR_ACCIDENTS.\`DATE\`) <= 2022
            GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
        ),
        traffic AS (
            SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, SUM(RR_TRAFFIC.FRTRNMI + RR_TRAFFIC.OTHERMI) AS mile
            FROM RR_TRAFFIC
            JOIN RR_CLASS ON RR_TRAFFIC.RAILROAD = RR_CLASS.RAILROAD
            WHERE RR_CLASS.RRCLASSIFICATION = 1
            AND CONCAT('20', RR_TRAFFIC.IYR) >= '2013' 
            AND CONCAT('20', RR_TRAFFIC.IYR) <= '2022'
            GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
        )
        SELECT accident.rr AS company, (accident.derailment / traffic.mile) * 1000000 AS derailment_rate
        FROM accident
        JOIN traffic ON accident.rr = traffic.rr;
  `, (err, results) => {
    if (err) {
      console.error('Error executing query', err);
      return;
    }
    // 输出查询结果
    console.log(results);
    // 当你不再需要连接池时，关闭它
    pool.end();
  });
}

// 如果database.js直接被node命令执行，则运行查询
if (require.main === module) {
  runQuery();
}

module.exports = pool.promise();

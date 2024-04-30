const express = require('express');
const router = express.Router();
const pool = require('./database'); // 确保路径与您的文件结构匹配

// 示例数据库路由
// router.get('/data', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM your_table_name');
//         res.json(rows);
//     } catch (err) {
//         console.error('Error when fetching data', err);
//         res.status(500).send('Server error');
//     }
// });

// Query
router.get('/query-results', async (req, res) => {

    const startYear = req.query.startYear || '2013';
    const endYear = req.query.endYear || '2022'; 

    // if (parseInt(startYear) > parseInt(endYear)) {
    //   return res.status(400).json({ message: "Start year must not be greater than end year." });
    // }

    const sqlQuery = `WITH
      accident AS (
          SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, COUNT(*) AS derailment
          FROM RR_ACCIDENTS
          JOIN RR_CLASS ON RR_ACCIDENTS.RAILROAD = RR_CLASS.RAILROAD
          WHERE RR_CLASS.RRCLASSIFICATION = 1
          AND RR_ACCIDENTS.ACC_TYPE = 1
          AND RR_ACCIDENTS.TRAIN_TYPE = 'F'
          AND RR_ACCIDENTS.TRACK_TYPE = 'MS'
          AND YEAR(RR_ACCIDENTS.\`DATE\`) >= ?
          AND YEAR(RR_ACCIDENTS.\`DATE\`) <= ?
          GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
      ),
      traffic AS (
          SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, SUM(RR_TRAFFIC.FRTRNMI + RR_TRAFFIC.OTHERMI) AS mile
          FROM RR_TRAFFIC
          JOIN RR_CLASS ON RR_TRAFFIC.RAILROAD = RR_CLASS.RAILROAD
          WHERE RR_CLASS.RRCLASSIFICATION = 1
          AND CONCAT('20', RR_TRAFFIC.IYR) >= ?
          AND CONCAT('20', RR_TRAFFIC.IYR) <= ?
          GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
      )
      SELECT accident.rr AS company, (accident.derailment / traffic.mile) * 1000000 AS derailment_rate
      FROM accident
      JOIN traffic ON accident.rr = traffic.rr`;

    // try {
    //   // Replace 'pool' with your database connection pool
    //   const [results] = await pool.query(`WITH
    //   accident AS (
    //       SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, COUNT(*) AS derailment
    //       FROM RR_ACCIDENTS
    //       JOIN RR_CLASS ON RR_ACCIDENTS.RAILROAD = RR_CLASS.RAILROAD
    //       WHERE RR_CLASS.RRCLASSIFICATION = 1
    //       AND RR_ACCIDENTS.ACC_TYPE = 1
    //       AND RR_ACCIDENTS.TRAIN_TYPE = 'F'
    //       AND RR_ACCIDENTS.TRACK_TYPE = 'MS'
    //       AND YEAR(RR_ACCIDENTS.\`DATE\`) >= 2013
    //       AND YEAR(RR_ACCIDENTS.\`DATE\`) <= 2022
    //       GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
    //   ),
    //   traffic AS (
    //       SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, SUM(RR_TRAFFIC.FRTRNMI + RR_TRAFFIC.OTHERMI) AS mile
    //       FROM RR_TRAFFIC
    //       JOIN RR_CLASS ON RR_TRAFFIC.RAILROAD = RR_CLASS.RAILROAD
    //       WHERE RR_CLASS.RRCLASSIFICATION = 1
    //       AND CONCAT('20', RR_TRAFFIC.IYR) >= '2013' 
    //       AND CONCAT('20', RR_TRAFFIC.IYR) <= '2022'
    //       GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
    //   )
    //   SELECT accident.rr AS company, (accident.derailment / traffic.mile) * 1000000 AS derailment_rate
    //   FROM accident
    //   JOIN traffic ON accident.rr = traffic.rr;`);
    //   res.json(results);
    // } catch (err) {
    //   console.error('Error executing query', err);
    //   res.status(500).json({ message: 'Error executing query', error: err });
    // }

    try {
      const [results] = await pool.query(sqlQuery, [startYear, endYear, startYear, endYear]);  // Pass parameters to the query
      res.json(results);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Error executing query', error: err });
    }
});

router.get('/accidents', async (req, res) => {
  const sqlQuery = 'SELECT ACCIDNO AS "id", LATITUDE AS "latitude", LONGITUD AS "longitude", RR_ACCIDENTS.RAILROAD AS "railroad", DATE AS "date", TOTAL_DERAIL AS "total_derail", ADL_CAUSE_SUBGROUP AS "acc_cause" FROM RR_ACCIDENTS JOIN RR_CLASS ON RR_ACCIDENTS.RAILROAD = RR_CLASS.RAILROAD     JOIN ACCIDENTS_CAUSE ON RR_ACCIDENTS.PRICAUSE = ACCIDENTS_CAUSE.FRA_CAUSE_CODE     WHERE RR_CLASS.RRCLASSIFICATION = 1     AND RR_ACCIDENTS.ACC_TYPE = 1     AND RR_ACCIDENTS.TRAIN_TYPE = "F"     AND RR_ACCIDENTS.TRACK_TYPE = "MS"     AND YEAR(RR_ACCIDENTS.`DATE`) BETWEEN 2013 AND 2022;';
  try {
      const [rows] = await pool.query(sqlQuery);
      res.json(rows);
  } catch (err) {
      console.error('Error when fetching accidents data', err);
      res.status(500).send('Server error');
  }
});

module.exports = router;
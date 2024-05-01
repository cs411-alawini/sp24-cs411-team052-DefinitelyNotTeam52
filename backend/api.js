const express = require('express');
const router = express.Router();
const pool = require('./database'); // 确保路径与您的文件结构匹配

// Query
router.get('/query-results', async (req, res) => {

    const startYear = req.query.startYear || '2013';
    const endYear = req.query.endYear || '2022'; 
    const railroadName = req.query.railroadName || 'BNSF';

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
          AND RR_CLASS.RAILROAD_SUCCESSOR = ?
          GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
      ),
      traffic AS (
          SELECT RR_CLASS.RAILROAD_SUCCESSOR AS rr, SUM(RR_TRAFFIC.FRTRNMI + RR_TRAFFIC.OTHERMI) AS mile
          FROM RR_TRAFFIC
          JOIN RR_CLASS ON RR_TRAFFIC.RAILROAD = RR_CLASS.RAILROAD
          WHERE RR_CLASS.RRCLASSIFICATION = 1
          AND CONCAT('20', RR_TRAFFIC.IYR) >= ?
          AND CONCAT('20', RR_TRAFFIC.IYR) <= ?
          AND RR_CLASS.RAILROAD_SUCCESSOR = ?
          GROUP BY RR_CLASS.RAILROAD_SUCCESSOR
      )
      SELECT accident.rr AS company, (accident.derailment / traffic.mile) * 1000000 AS derailment_rate
      FROM accident
      JOIN traffic ON accident.rr = traffic.rr`;

    try {
      const [results] = await pool.query(sqlQuery, [startYear, endYear, railroadName, startYear, endYear, railroadName]);
      res.json(results);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Error executing query', error: err });
    }
});

router.get('/accidents', async (req, res) => {
  const { startYear = 2013, endYear = 2022 } = req.query; // 提供默认值
  const railroadName = req.query.railroadName || 'BNSF';

  const sqlQuery = `
    SELECT ACCIDNO AS "id", LATITUDE AS "latitude", LONGITUD AS "longitude", 
           RR_ACCIDENTS.RAILROAD AS "railroad", DATE AS "date", TOTAL_DERAIL AS "total_derail", 
           ADL_CAUSE_SUBGROUP AS "acc_cause" 
    FROM RR_ACCIDENTS 
    JOIN RR_CLASS ON RR_ACCIDENTS.RAILROAD = RR_CLASS.RAILROAD     
    JOIN ACCIDENTS_CAUSE ON RR_ACCIDENTS.PRICAUSE = ACCIDENTS_CAUSE.FRA_CAUSE_CODE     
    WHERE RR_CLASS.RRCLASSIFICATION = 1     
      AND RR_ACCIDENTS.ACC_TYPE = 1     
      AND RR_ACCIDENTS.TRAIN_TYPE = 'F'     
      AND RR_ACCIDENTS.TRACK_TYPE = 'MS'     
      AND YEAR(RR_ACCIDENTS.DATE) BETWEEN ? AND ?
      AND RR_CLASS.RAILROAD_SUCCESSOR = ?;
  `;

  try {
      const [rows] = await pool.query(sqlQuery, [startYear, endYear, railroadName]);
      res.json(rows);
  } catch (err) {
      console.error('Error when fetching accidents data', err);
      res.status(500).send('Server error');
  }
});

// router.get('/create-trigger', async (req, res) => {
//   const createTriggerSQL = `
//       CREATE TRIGGER update_railroad
//       BEFORE INSERT ON RR_TRAFFIC
//       FOR EACH ROW
//       BEGIN
//           IF NEW.RAILROAD = 'CN' THEN
//               SET NEW.RAILROAD = 'CNGT';
//           ELSEIF NEW.RAILROAD = 'CP' THEN
//               SET NEW.RAILROAD = 'CP(US)';
//           END IF;
//       END;
//   `;

//   try {
//       await pool.query(createTriggerSQL);
//       res.send('Trigger created successfully.');
//   } catch (err) {
//       console.error('Error creating trigger:', err);
//       res.status(500).json({ message: 'Error creating trigger', error: err.message });
//   }
// });

router.post('/add', async (req, res) => {
  const { input1, input2, input3, input4, input5, input6, input7, input8, input9, input10 } = req.body;
  // You would normally perform validation/checking here before inserting into the database

  const sqlQuery = `INSERT INTO RR_TRAFFIC
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
      const results = await pool.query(sqlQuery, [input1, input2, input3, input4, input5, input6, input7, input8, input9, input10]);
      res.status(201).json({ success: true, message: 'Data inserted successfully', results });
  } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ success: false, message: 'Failed to insert data', error: error.message });
  }
});

router.post('/modify', async (req, res) => {
  const { input1, input2, input3, input4, input5, input6, input7, input8, input9, input10 } = req.body;

  // SQL UPDATE Statement
  const sqlQuery = `
      UPDATE RR_TRAFFIC
      SET RAILROAD = ?,
          IYR = ?,
          IMO = ?,
          STATE = ?,
          COUNTY = ?,
          YSMI = ?,
          FRTRNMI = ?,
          PASTRNMI = ?,
          OTHERMI = ?
      WHERE TRAFFIC_CODE = ?;`;

  try {
      const results = await pool.query(sqlQuery, [input2, input3, input4, input5, input6, input7, input8, input9, input10, input1]);
      if (results.affectedRows === 0) {
          res.status(404).json({ success: false, message: "No record found to update" });
      } else {
          res.status(200).json({ success: true, message: 'Data updated successfully', results });
      }
  } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ success: false, message: 'Failed to update data', error: error.message });
  }
});

router.post('/delete', async (req, res) => {
  const { input1 } = req.body;  // 从请求体中获取 input1

  if (!input1) {
      return res.status(400).json({ success: false, message: 'input1 is required for deletion' });
  }

  const sqlQuery = 'DELETE FROM RR_TRAFFIC WHERE TRAFFIC_CODE = ?';  // 确保替换 input1_column_name 为您的数据库中对应的列名称

  try {
      const result = await pool.query(sqlQuery, [input1]);
      if (result.affectedRows === 0) {
          // 如果没有行被删除，发送一个没有找到记录的响应
          res.status(404).json({ success: false, message: "No record found with the given input1" });
      } else {
          // 如果删除成功，发送一个成功的响应
          res.status(200).json({ success: true, message: 'Record deleted successfully' });
      }
  } catch (error) {
      // 处理任何可能的数据库错误
      console.error('Error deleting data:', error);
      res.status(500).json({ success: false, message: 'Failed to delete data', error: error.message });
  }
});

router.post('/derailment-causes', async (req, res) => {
  console.log("HAHA");
  try {
    const [result, fields] = await pool.query('CALL Derailment_cause_rate_recent_ten_years();');
      res.status(200).json({ success: true, message: result[0] });
    } catch (error) {
        // 处理任何可能的数据库错误
        console.error('SP ERROR:', error);
        // res.status(500).json({ success: false, message: 'Failed to load SP', error: error.message });
    }
});

router.post('/top15-traffic', async (req, res) => {
  try {
    const [result, fields] = await pool.query('CALL Top_15_Railroad_traffic_ten_years();');
      res.status(200).json({ success: true, message: result[0] });
    } catch (error) {
        // 处理任何可能的数据库错误
        console.error('SP ERROR:', error);
        // res.status(500).json({ success: false, message: 'Failed to load SP', error: error.message });
    }
});

router.post('/advanced-action', async (req, res) => {
  const {advancedInput1,advancedInput2,advancedInput3,advancedInput4} = req.body;

  try {
    const results = await pool.query('CALL UpdateTrafficData(?,?,?,?);', [advancedInput1,advancedInput2,advancedInput3,advancedInput4]);
      res.status(200).json({ success: true, message: results });
    } catch (error) {
        // 处理任何可能的数据库错误
        console.error('SP ERROR:', error);
        res.status(500).json({ success: false, message: 'Failed to load SP', error: error.message });
    }
});

module.exports = router;
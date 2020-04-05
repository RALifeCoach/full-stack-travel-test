const express = require('express');
const router = express.Router();
const Database = require('./Database');

router.get('/users/', (req, res) => {
  const sql = 'Select * from users';
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.get('/trips/', (req, res) => {
  console.log('Trips', req.role, req.userId);
  const sql = req.role === 'super'
    ? 'Select * from Trips'
    : `Select * from Trips where id = ${req.userId}`;
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.post('/deleteTrip/', (req, res) => {
  const sql = `Delete from Trips where id = ${req.body.id}`;
  Database.query(sql, rows => {
    res.json({status: 'success'});
  });
});

module.exports = router;
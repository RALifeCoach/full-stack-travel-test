const express = require('express');
const router = express.Router();
const Database = require('./Database');

router.get('/users/', (req, res) => {
  const sql = 'Select * from users';
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.post('/deleteUser/', (req, res) => {
  const sql = `Delete from users where id = ${req.body.id}`;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.post('/updateUser/', (req, res) => {
  const sql = req.body.id
    ? `Update users
      set userId = '${req.body.userId}',
          userName = '${req.body.userName}',
          role = '${req.body.role }'
      where id = ${req.body.id}`
    : `insert into users
      (userId, userName, role) values
      (
        '${req.body.userId}', 
        '${req.body.userName}', 
        '${req.body.role}'
      )
    `;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.post('/updateUser/', (req, res) => {
  const sql = req.body.id
    ? `Update users
      set userId = '${req.body.userId}',
          userName = '${req.body.userName}',
          role = '${req.body.role }'
      where id = ${req.body.id}`
    : `insert into users
      (userId, userName, role) values
      (
        '${req.body.userId}', 
        '${req.body.userName}', 
        '${req.body.role}'
      )
    `;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.get('/trips/', (req, res) => {
  const sql = req.role === 'super'
    ? 'Select * from Trips'
    : `Select * from Trips where id = ${req.userId}`;
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.post('/deleteTrip/', (req, res) => {
  const sql = `Delete from Trips where id = ${req.body.id}`;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.post('/updateTrip/', (req, res) => {
  const sql = req.body.id
    ? `Update Trips
      set destination = '${req.body.destination}',
          startDate = '${req.body.startDate}',
          endDate = ${req.body.endDate ? `'${req.body.endDate }'` : null},
          comments = ${req.body.comments ? `'${req.body.comments }'` : null}
      where id = ${req.body.id}`
    : `insert into Trips
      (destination, startDate, endDate, comments, userId) values
      (
        '${req.body.destination}', 
        '${req.body.startDate}', 
        ${req.body.endDate ? `'${req.body.endDate }'` : null}, 
        ${req.body.comments ? `'${req.body.comments }'` : null}, 
        ${req.userId}
      )
    `;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

module.exports = router;
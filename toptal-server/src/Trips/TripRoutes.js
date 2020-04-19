const express = require('express');
const router = express.Router();
const Database = require('../Database');
const tripValidate = require('./TripValidate');

router.get('/query', (req, res) => {
  const sql = req.role === 'super'
    ? 'Select * from Trips'
    : `Select * from Trips where userId = ${req.userId}`;
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.post('/delete', (req, res) => {
  if (!tripValidate.isValidDelete(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  const sql = `Delete from Trips where id = ${req.body.id}`;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.post('/update', (req, res) => {
  if (!tripValidate.isValidUpdateInsert(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  const sql = req.body.id
    ? `Update Trips
      set destination = '${req.body.destination}',
          startDate = '${req.body.startDate}',
          endDate = ${req.body.endDate ? `'${req.body.endDate}'` : null},
          comments = ${req.body.comments ? `'${req.body.comments}'` : null}
      where id = ${req.body.id}`
    : `insert into Trips
      (destination, startDate, endDate, comments, userId) values
      (
        '${req.body.destination}', 
        '${req.body.startDate}', 
        ${req.body.endDate ? `'${req.body.endDate}'` : null}, 
        ${req.body.comments ? `'${req.body.comments}'` : null}, 
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

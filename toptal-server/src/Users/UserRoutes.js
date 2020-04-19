const express = require('express');
const router = express.Router();
const Database = require('../Database');
const bcrypt = require('bcrypt');
const userValidate = require('./UserValidate');

router.get('/query', (req, res) => {
  const sql = 'Select id, userId, userName, role from users';
  Database.query(sql, rows => {
    res.json(rows);
  });
});

router.post('/delete', (req, res) => {
  if (!userValidate.isValidDelete(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  const sql = `Delete from users where id = ${req.body.id}`;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

router.post('/update', (req, res) => {
  if (req.body.id && !userValidate.isValidUpdate(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  if (!req.body.id && !userValidate.isValidInsert(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  const sql = req.body.id
    ? `Update users
      set userId = '${req.body.userId}',
          userName = '${req.body.userName}',
          role = '${req.body.role}'
      where id = ${req.body.id}`
    : `insert into users
      (userId, userName, role, password) values
      (
        '${req.body.userId}', 
        '${req.body.userName}', 
        '${req.body.role}',
        '${req.body.password}'
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

router.post('/changePassword', (req, res) => {
  const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
  const sql = `SELECT * FROM users where id = '${req.userId}'`;
  Database.query(sql, (rows) => {
    if (rows.length !== 1) {
      res.status(500).json({error: "Not Authorized"});
      return;
    }

    bcrypt.compare(req.body.oldPassword, rows[0].password, function (err, success) {
      if (!success) {
        res.status(500).json({error: "Not Authorized"});
        return;
      }
      const sql = `Update users set password = '${newPassword}' where id = ${req.userId}`;
      Database.exec(sql, err => {
        if (err) {
          res.json({status: 'failure', message: err});
          return;
        }
        res.json({status: 'success'});
      });
    });
  });
});

router.post('/resetPassword', (req, res) => {
  if (!userValidate.isValidReset(req.body)) {
    res.json({status: 'failure', message: 'Invalid message body'});
    return;
  }
  const sql = `Update users set password = '${req.body.password}' where id = ${req.body.id}`;
  Database.exec(sql, err => {
    if (err) {
      res.json({status: 'failure', message: err});
      return;
    }
    res.json({status: 'success'});
  });
});

module.exports = router;

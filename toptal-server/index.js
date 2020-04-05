const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Database = require('./src/Database');
const apiRoute = require('./src/ApiCalls');

function isAuthorized(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    const token = req.headers.authorization;
    const privateKey = fs.readFileSync('./private.pem', 'utf8');
    jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, user) => {
      if (err) {
        res.status(500).json({error: "Not Authorized"});
        throw new Error("Not Authorized");
      }
      if (user.body.expiry < new Date().getTime()) {
        res.status(500).json({error: "Token Expired"});
        throw new Error("Not Authorized");
      }
      req.role = user.body.role;
      req.userId = user.body.id;
      return next();
    });
  } else {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }
}

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());

app.post('/login/', (req, res) => {
  const sql = `SELECT * FROM users where userId = '${req.body.userId}' and password = '${req.body.password}'`;
  Database.query(sql, (rows) => {
    if (rows.length !== 1) {
      res.status(500).json({error: "Not Authorized"});
      return;
    }

    const privateKey = fs.readFileSync('./private.pem', 'utf8');
    const expiry = new Date().getTime() + (60 * 60 * 1000);
    const role = rows[0].role;
    const userName = rows[0].userName;
    const userId = req.body.userId;
    const id = rows[0].id;
    const token = jwt.sign(
      {
        "body": {
          "userId": userId,
          "userName": userName,
          "expiry": expiry,
          "role": role,
          "id": id,
        }
      },
      privateKey,
      {algorithm: 'HS256'}
    );
    res.send({token, role, userName, userId, id});
  });
});

app.use('/api', isAuthorized, apiRoute);

app.listen(3010, () => {
  console.log("Server is listening on port 3010");
});

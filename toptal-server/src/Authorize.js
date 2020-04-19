const jwt = require('jsonwebtoken');
const fs = require('fs');
const redis = require('./Redis');

function isAuthorized(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    const token = req.headers.authorization;
    const privateKey = fs.readFileSync('./private.pem', 'utf8');
    jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, redisBody) => {
      if (err) {
        res.status(500).json({error: "Not Authorized"});
        throw new Error("Not Authorized");
      }
      redis.redisGet(redisBody.redisKey, userStr => {
        const user = JSON.parse(userStr);
        if (!user) {
          res.json({status: 'failure', message: 'Token Expired'});
          return;
        }
        if (user.ip !== req.clientIp) {
          res.json({status: 'failure', message: 'Token Expired'});
          return;
        }
        req.role = user.role;
        req.userId = user.id;
        return next();
      });
    });
  } else {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }
}

module.exports = isAuthorized;

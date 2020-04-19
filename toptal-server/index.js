const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const ApiRoutes = require('./src/ApiRoutes');
const AuthenticationRoutes = require('./src/Authentication/AuthenticationRoutes');
const dotenv = require('dotenv');
const Database = require('./src/Database');
const helmet = require('helmet');
const isAuthorized = require('./src/Authorize');
const requestIp = require('request-ip');

const ipMiddleware = function(req, res, next) {
  req.clientIp = requestIp.getClientIp(req);
  next();
};

dotenv.config();

const app = express();

app.use(helmet());

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());

app.use(ipMiddleware);

app.use('/', AuthenticationRoutes);

app.use('/api', isAuthorized, ApiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  Database.connect();
});

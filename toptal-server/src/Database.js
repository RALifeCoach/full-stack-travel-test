const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = {};
  }

  connect() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    this.connection.connect(function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("connected");
    });
  }

  query(sql, callback) {
    this.connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        throw err;
      }

      callback(rows);
    });
  }

  exec(sql, callback) {
    this.connection.query(sql, (err, rows) => {
      callback(err);
    });
  }
}

module.exports = new Database();

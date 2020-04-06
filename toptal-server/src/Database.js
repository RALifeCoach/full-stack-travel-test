const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "topher123",
      database: 'toptal'
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

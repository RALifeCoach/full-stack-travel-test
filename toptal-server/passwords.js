const Database = require('./src/Database');
const bcrypt = require('bcrypt');

const sql = 'Select id, password from users';
Database.query(sql, rows => {
  rows.forEach(row => {
    if (row.password) {
      const password = bcrypt.hashSync(row.password, 10);
      const update = `update users set password = '${password}' where id=${row.id}`;
      Database.exec(update, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});


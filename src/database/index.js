var mysql = require('mysql');
var config = require('../config');

const db = mysql.createConnection(config.db);

db.connect(err => {
  if (process.env.NODE_ENV === development) {
    if (err) {
      console.log('Error connecting to database');
    } else {
      console.log('Success in connecting to database');
    }
  }
});

db.query(`USE ${config.db.db}`);

export default db;

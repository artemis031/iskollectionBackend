var mysql = require('mysql');
var config = require('../config');

var db = mysql.createConnection(config.db);

db.connect(err => {
  if (err) {
    console.log('Error connecting to database');
  } else {
    console.log('Success in connecting to database');
  }
});

db.query('USE iskollection');

module.exports = db;

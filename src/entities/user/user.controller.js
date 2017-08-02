var db = require('../../database');
var config = require('../../config');

exports.validateEmail = (email, id) => {
  return new Promise((resolve, reject) => {
    let query = `
        SELECT
            COUNT(*)
            AS count
        FROM
            user
        WHERE email = ?
    `;
    var values = [email];

    if (id) {
      query += ' AND id != ?';
      values.push(id);
    }

    db.query(query, values, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: 'Internal server error while validating email',
          error: err.sqlMessage
        });
      }

      if (rows[0].count) {
        reject({
          status: 409,
          message: 'Email is already taken',
          error: null
        });
      }
      resolve();
    });
  });
};

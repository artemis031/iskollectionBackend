var db = require('../../database');
var config = require('../../config');

exports.login = credentials => {
  return new Promise((resolve, reject) => {
    const { email, password } = credentials;
    const query = `
    SELECT
      id,
      firstName,
      lastName,
      email,
      password
    FROM
      user
    WHERE
      email = ? AND
      password = SHA2(CONCAT(?, ?), 0)
  `;

    const values = [email, password, config.salt];

    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject({
          status: 500,
          message: 'Internal server while loggin in',
          error: err.sqlMessage
        });
      }

      if (!rows.length) {
        console.log('hahah');
        return reject({
          status: 404,
          message: 'Email and password combination not found',
          error: null
        });
      }
      resolve(rows[0]);
    });
  });
};

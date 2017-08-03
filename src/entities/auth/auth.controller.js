import db from '../../database';
import config from '../../config';

export const login = credentials => {
  return new Promise((resolve, reject) => {
    const { email, password } = credentials;

    const query = `
    SELECT
      id,
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      studentNumber,
      college,
      course,
      signature,
      isGraduating,
      isAdmin,
      dateCreated,
      dateDeleted
    FROM
      user
    WHERE
      email = ? AND
      password = SHA2(CONCAT(?, ?), 0)
  `;

    const values = [email, password, config.salt];

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server while loggin in',
          error: err.sqlMessage
        });
      }

      if (!rows.length) {
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

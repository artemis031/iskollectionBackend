var db = require('../../database');
var config = require('../../config');

exports.validateEmail = (email, id) => {
  return new Promise((resolve, reject) => {
    if (!email.endsWith('@up.edu.ph')) {
      reject({
        status: 409,
        message: 'Email is not a UP account',
        error: null
      });
    }
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

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      id,
      firstName,
      lastName,
      email,
      password
    FROM
      user
    `;

    var values = null;

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while getting all users',
          error: err.sqlMessage
        });
      }
      resolve(rows);
    });
  });
};

exports.getById = id => {
  return new Promise((resolve, reject) => {
    var query = `
	SELECT
      id,
      firstName,
      lastName,
      email,
      password
    FROM
      user
    WHERE
      id = ?
    `;

    var values = [id];

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while getting user',
          error: err.sqlMessage
        });
      }
      if (!rows.length) {
        return reject({
          status: 404,
          message: 'User does not exist',
          error: null
        });
      }
      resolve(rows[0]);
    });
  });
};

exports.create = (body, fileName) => {
  return new Promise((resolve, reject) => {
    var { firstName, lastName, email, password } = body;
    var query = `
      INSERT INTO
        user(
        	id,
          firstName,
          lastName,
          email,
          password
        )
      VALUES (
      		DEFAULT, ?, ?, ?, SHA2(CONCAT(?, 'maligayangPagong'), 0)
      )
      `;

    var values = [
      firstName, //body.firstName
      lastName, //body.lastName
      email,
      password
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while creating user',
          error: err.sqlMessage
        });
      }

      resolve(results.insertId);
    });
  });
};

exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    var { id, firstName, lastName, email, password } = body;

    var query = `
      UPDATE
        user
      SET
        id = ?,
        firstName = ?,
        lastName = ?,
        email = ?,
        password = ?
      WHERE
        id = ?
    `;

    const values = [id, firstName, lastName, email, password, id];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while updating user',
          error: err.sqlMessage
        });
      }

      resolve();
    });
  });
};

exports.updateSignature = (id, fileName, done) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        user
      SET
        signature = ?
      WHERE
        id = ?
    `;

    const values = [fileName, id];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while updating signature',
          error: err.sqlMessage
        });
      }

      resolve();
    });
  });
};

exports.removeById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        user
      SET
        dateDeleted = NOW()
      WHERE 
        id = ?  
    `;

    const values = [id];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while deleting user',
          error: err.sqlMessage
        });
      }

      resolve();
    });
  });
};

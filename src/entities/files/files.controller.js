var db = require('../../database');
var config = require('../../config');

exports.getFiles = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      *
    FROM
      files
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

exports.getFileById = id => {
  return new Promise((resolve, reject) => {
    var query = `
  SELECT
      *
    FROM
      files
    WHERE
      id = ?
    `;
    var values = [id];

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while getting file',
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
    var { id, subject, fileName, userId, repositoryId, filePath } = body;
    var query = `
      INSERT INTO
        files(
          id,
          subject,
          fileName,
          userId,
          repositoryId,
          filePath
        )
        VALUES (
          DEFAULT, ?, ?, ?, ?, ?, ?
      )
      `;

    var values = [id, subject, fileName, userId, repositoryId, filePath];

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
    var { id, subject, fileName, userId, repositoryId, filePath } = body;
    var query = `
      UPDATE
        files
      SET
        id = ?,
        subject = ?,
        fileName = ?,
        userId = ?,
        repositoryId = ?,
        filePath = ?
      WHERE
        id = ?
    `;

    const values = [id, subject, fileName, userId, repositoryId, filePath, id];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while updating file',
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
        files
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

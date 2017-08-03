var db = require('../../database');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      id,
      userID
    FROM
      files
    WHERE
      isApproved = 1
      AND dateDeleted IS NULL
    `;

    const values = null;

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while getting all petitions',
          error: err.sqlMessage
        });
      }
      resolve(rows);
    });
  });
};

exports.getById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        semester,
        year,
        title,
        description,
        isApproved,
        dateCreated,
        dateDeleted
      FROM
        petition
      WHERE
        id = ? AND isApproved = 1
      `;

    const values = [id];

    db.query(query, values, (err, rows) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while getting petition',
          error: err.sqlMessage
        });
      }

      resolve(rows[0]);
    });
  });
};

exports.create = body => {
  return new Promise((resolve, reject) => {
    const { semester, year, title, description } = body;

    const query = `
      INSERT INTO
        petition(
          semester,
          year,
          title,
          description,
          isApproved,
          dateCreated,
          dateDeleted
        )
        VALUES(
          ?, ?, ?, ?, 0, NOW(), NULL
        )
    `;

    const values = [semester, year, title, description];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while creating petition',
          error: err.sqlMessage
        });
      }

      resolve(results.insertId);
    });
  });
};

exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        petition
      SET
        ?
      WHERE
        id = ?
    `;

    const values = [body, id];

    db.query(query, values, (err, results) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while updating petition',
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
          petition
        SET
          dateDeleted = NOW()
        WHERE
          id = ?
      `;
    const values = [id];

    db.query(query, values, err => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while deleting petition',
          error: err.sqlMessage
        });
      }

      resolve();
    });
  });
};

var db = require('../database');

exports.validate = (data, pattern) => {
  return new Promise((resolve, reject) => {
    const missing = [];
    const malformed = [];

    for (const key in pattern) {
      const dataType = typeof data[key];
      if (dataType === 'undefined') {
        missing.push(key);
      } else if (
        (pattern[key] === 'number' && isNaN(data[key])) ||
        (pattern[key] !== 'number' && pattern[key] !== dataType)
      ) {
        malformed.push(key);
      }
    }

    let errMessage = 'Invalid request data.';

    if (missing.length) {
      errMessage += ' Missing: ' + missing.join(', ') + '.';
    }

    if (malformed.length) {
      errMessage += ' Malformed: ' + malformed.join(', ') + '.';
    }

    if (missing.length || malformed.length) {
      return reject({
        status: 400,
        message: errMessage,
        error: null
      });
    } else {
      resolve();
    }
  });
};

exports.beginTransaction = () => {
  return new Promise((resolve, reject) => {
    db.beginTransaction(err => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while beginning transaction',
          error: err.sqlMessage
        });
      }
      resolve();
    });
  });
};

exports.rollback = () => {
  return new Promise((resolve, reject) => {
    db.rollback(err => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while rolling back',
          error: err.sqlMessage
        });
      }
      resolve();
    });
  });
};

exports.commit = () => {
  return new Promise((resolve, reject) => {
    db.commit(err => {
      if (err) {
        return reject({
          status: 500,
          message: 'Internal server error while committing database',
          error: err.sqlMessage
        });
      }

      resolve();
    });
  });
};

exports.moveFile = (identifier, file) => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${identifier}.${fileExtension}`;
    const filePath = __dirname + `/../../uploads/${fileName}`;

    file.mv(filePath, fileError => {
      if (fileError) {
        return reject({
          status: 500,
          message: 'Internal server error with while moving file',
          error: null
        });
      }

      resolve(fileName);
    });
  });
};

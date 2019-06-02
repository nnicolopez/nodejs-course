const msyql = require('mysql2');

const pool = msyql.createPool({
  host: '127.0.0.2',
  user: 'docker',
  database: 'node-course',
  password: 'docker'
});

module.exports = pool.promise();
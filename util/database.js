const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-course', 'docker', 'docker', {
  dialect: 'mysql', 
  host: '127.0.0.2'
});

module.exports = sequelize;
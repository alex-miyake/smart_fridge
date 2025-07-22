const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fridge_inventory', 'fridge_user', 'strong_secure_pw_!2024', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
/* 
Schema for each user. 

Using a factory function 
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email:    { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    //refreshToken: { type: DataTypes.STRING, allowNull: true }
  },{
    timestamps: true,
  });
  return User;
};
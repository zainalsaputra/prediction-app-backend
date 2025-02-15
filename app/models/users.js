const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../../models/users');

const users = new Users(DataTypes);

Users.init(users.defineSchema(), {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  timestamps: true,
});

module.exports = Users;

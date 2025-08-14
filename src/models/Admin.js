// src/models/Admin.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Admin = db.define('Admin', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'admins'
});

module.exports = Admin;
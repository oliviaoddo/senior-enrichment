'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true,
     validate: {
        isEmail: true
     }
    }
})

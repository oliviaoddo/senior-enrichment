'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const { Student } = require('./index');

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  image: Sequelize.STRING
}
);


    //ideally a student should be assigned to a different campus before deleting the campus in order to keep their information in the database
    //setting their campusId to null before destroying the campus breaks the frontend

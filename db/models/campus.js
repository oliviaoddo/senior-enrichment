'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const { Student } = require('./index');

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  hooks: {
    beforeDestroy: function(campus){
      Student.update({campusId: null}, {where: {campusId: campus.id}});
        }
    }
}
);

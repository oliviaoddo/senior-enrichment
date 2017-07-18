const { TEXT, STRING } = require('sequelize');
var db = require('../index.js')
const bcrypt = require('bcrypt-nodejs');


module.exports = db.define('user', {
  first_name: STRING,
  last_name: STRING,
  email: {
     type: STRING,
     allowNull: false,
     unique: true,
     validate: {
        isEmail: true
     }
    },
    isAdmin: {
        type: BOOLEAN,
        defaultValue: false
    },
    password: STRING,
    googleId: STRING
},
{
    hooks: {
        beforeCreate: function(instance){
            instance.password =  bcrypt.hashSync(instance.password, bcrypt.genSaltSync(8), null)
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
})

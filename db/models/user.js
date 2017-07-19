const { TEXT, STRING, BOOLEAN } = require('sequelize');
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
          console.log(instance);
            instance.password =  bcrypt.hashSync(instance.password);
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            const valid =  bcrypt.compareSync(password, this.password);
            console.log("do they match", valid);
            return valid;
        }
    }
})

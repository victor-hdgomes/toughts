//Importing data types
const { DataTypes } = require('sequelize')

//Connection with database
const db = require('../db/conn')

//User


//Model
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
})

//Exporting model
module.exports = User
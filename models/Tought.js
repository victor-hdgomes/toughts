//Importing data types
const { DataTypes } = require('sequelize')

//Connection with database
const db = require('../db/conn')

//Importing User
const User = require('./User')

//Model
const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

//Relation Tought with User
Tought.belongsTo(User)
User.hasMany(Tought)

//Exporting model
module.exports = Tought
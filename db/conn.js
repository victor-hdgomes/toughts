//Importing sequelize
const { Sequelize } = require('sequelize')

//Create connection with database
const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//try to connect with database
try {
    sequelize.authenticate()
    console.log('Connected with database')
} catch (error) {
    console.log(`Connection with database isn't ok, error: ${error}`)
}

module.exports = sequelize
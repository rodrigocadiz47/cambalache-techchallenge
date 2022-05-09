const Sequelize = require('sequelize');

const db = new Sequelize('users', 'postgres', 'olakase45', {
    host: 'localhost',
    dialect: 'postgres',
    loggin: false
})
module.exports = db;
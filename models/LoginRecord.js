const { DataTypes } = require('sequelize');
const db = require('../database/_db');

const LoginRecord = db.define('loginrecord', 
    {
        date: {
            type: DataTypes.DATE,
        },
        type: {
            type: DataTypes.ENUM('Success', 'Error'),
            allowNull: false
        }
    }
)

LoginRecord.beforeCreate(async (login)=>{
    login.date = new Date();
})

module.exports = LoginRecord
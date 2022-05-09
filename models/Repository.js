const { DataTypes } = require('sequelize');
const db = require('../database/_db');

const Repository = db.define('repository', 
    {
        projectName : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        language: {
            type: DataTypes.ENUM('español', 'ingles', 'portugues'),
            allowNull: false
        },
        creationDate : {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.TEXT
        }
    }
)

Repository.beforeCreate(async (repo)=>{
    repo.creationDate = new Date();
})

module.exports = Repository
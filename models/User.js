const { DataTypes } = require('sequelize');
const db = require('../database/_db');
const bcrypt = require('bcrypt');

const User = db.define('user',
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        birthDay: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        favLanguage: {
            type: DataTypes.ENUM('javascript', 'phyton', 'java', 'apex')
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salt: {
            type: DataTypes.TEXT
        }
    }
)

User.beforeCreate(async (u)=>{
    u.salt = await bcrypt.genSalt(12)
    u.password = await bcrypt.hash(u.password, u.salt);
})

User.prototype.isValidPassword = async function (password) {
    try{
        const result = await bcrypt.hash(password, this.salt);
        return result === this.password;
    } catch(error){
        console.log(error)
    }
}

module.exports = User;
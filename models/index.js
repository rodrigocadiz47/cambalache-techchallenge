const User = require('./User');
const Repository = require('./Repository');
const LoginRecord = require('./LoginRecord');

User.hasOne(Repository, {foreingKey: { allowNull: false }});
User.hasOne(LoginRecord, {foreingKey: { allowNull: false }});

module.exports = {User, Repository, LoginRecord};
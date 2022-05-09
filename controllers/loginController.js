const { User } = require("../models");
const {key} = require('../settings/keys')
const jwt = require('jsonwebtoken');
const {generateLoginRecord} = require('../controllers/loginRecordController');
const {client} = require('../redis');


const generateToken = async function(req, res){
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user){
            const isValid = await user.isValidPassword(password);
            if(isValid){
                generateLoginRecord(user.id, true);
                const payload = {
                    check: true
                };
                const token = jwt.sign(payload, key,{
                    expiresIn: '7d'
                });
                await client.set(token, 'valid')
                res.status(200).json({
                    message: 'Authentication Success',
                    token: token
                });
            }else{
                generateLoginRecord(user.id, false);
                res.status(400).json({
                    error: 'Authentication Error'
                });
            }
        }else{
            res.status(400).json({
                error: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Token Error'
        })
    }
}

const logOut = async function(req, res){
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        token = token.split(' ')[1];
        await client.del(token);
        await client.set(token, 'invalid');
        res.send('User Logout');
    } catch (error) {
        res.status(500).json({
            error: 'Token Error'
        });
    }
}


module.exports = {generateToken, logOut};
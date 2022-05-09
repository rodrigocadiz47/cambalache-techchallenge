const {LoginRecord, User} = require('../models');

const generateLoginRecord = async function(userId, isValid){
    if(isValid){
        await LoginRecord.create({type: 'Success', userId: userId});
    }else{
        await LoginRecord.create({type: 'Error', userId: userId});
    }
}

const getLoginRecordsByUserId = async function(req, res){
    const {userid} = req.query;
    try {
        const user = await User.findByPk(userid);
        if(user){
            const records= await LoginRecord.findAll({
                where: {
                    userId: userid
                }
            });
            if(records && records.length>0){
                res.status(200).send(records)
            }else{
                res.status(404).json({
                    error: 'Not found'
                })
            }
        }else{
            res.status(400).json({
                error: 'Bad Request'
            })
        }
    } catch (error) {
        
    }
}

module.exports = {generateLoginRecord, getLoginRecordsByUserId};
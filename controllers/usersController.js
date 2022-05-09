const {User} = require('../models');

const getUserById = async function(req, res){
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId);
        if(user){
            res.status(200).send(user);
        }else{
            res.status(400).json({
                error: 'An error has ocurred'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });;
    }
}

const createUser = async function(req, res){
    const {email, name, birthDay, password, favLanguage} = req.body;
    try {
        await User.create({name, email, password, birthDay, favLanguage})
        res.status(201).send('User Registered');
    } catch (error) {
        res.json({
            error: error
        });
    }
}

const updateUser = async function(req, res){
    const {id} = req.params;
    const {name, birthDay, favLanguage} = req.body;
    try {
        const userToUpdate = await User.findByPk(id);
        if(userToUpdate){
            const updatedUser = await userToUpdate.update({name, birthDay, favLanguage});
            res.status(200).json({
                user: updatedUser,
                message: 'Updated User'
            });
        }else{
            res.status(401).send('Bad Request');
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const changePassword = async function(req, res){
    const {id} = req.params;
    const {password} = req.body;
    try{
        const userToChangePassword = await User.findByPk(id);
        if(userToChangePassword){
            await userToChangePassword.update({password: password});
            res.status(200).send('Password has been changed');
        }else{
            res.status(401).send('Bad Request');
        }
    } catch(error){
        res.status(500).json({
            error: error
        });
    }
}

const deleteUser = async function(req, res){
    const {id} = req.params;
    try {
        const userDeleted = await User.destroy({
            where: {
                id: id
            }
        });
        if(userDeleted){
            res.status(200).send('User Deleted')
        }else{
            res.status(401).send('An error has ocurred')
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports= {createUser, updateUser, changePassword, getUserById, deleteUser}
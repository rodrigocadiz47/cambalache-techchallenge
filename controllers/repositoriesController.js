const {Repository, User} = require('../models');

const getRepositoriesByUserId = async function(req, res){
    console.log('algo')
    const {userid} = req.query;
    console.log(userid)
    try {
        const repositories = await Repository.findAll({
            where:{
                userId: userid
            }
        });
        if(repositories){
            res.status(200).send(repositories);
        }else{
            res.status(400).json({
                error: 'An error has ocurred'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const getRepositoryById = async function(req, res){
    const {id} = req.params;
    try {
        const repository = await Repository.findOne({
            where: {
                id: id
            }
        });
        if(repository){
            res.status(200).send(repository);
        }else{
            res.status(400).json({
                error: 'An Error has ocurred'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const createRepository = async function(req, res){
    const {projectName, language, description, userId} = req.body;
    try {
        const user = User.findByPk(userId);
        if(user){
            await Repository.create({projectName, language, description, userId});
            res.status(201).send('Repository Created')
        }else{
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.json({
            error: error
        });
    }
}

const updateRepository = async function(req, res){
    const {projectName, language, description} = req.body;
    const {id} = req.params;
    try {
        const repositoryToUpdate = await Repository.findByPk(id);
        if(repositoryToUpdate){
            await repositoryToUpdate.update({projectName, language, description});
            res.status(200).send('User Updated');
        }else{
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.json({
            error: error
        });
    }
}

const deleteReposotory = async function(req, res){
    const {id} = req.params;
    try {
        const userDeleted = await Repository.destroy({
            where: {
                id : id
            }
        });
        if(userDeleted){
            res.status(200).send('User Deleted');
        }else{
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        res.json({
            error: error
        });
    }
}

module.exports = {getRepositoriesByUserId, getRepositoryById, createRepository, updateRepository, deleteReposotory};
const express = require('express');
const router = express.Router();
const {getRepositoryById, getRepositoriesByUserId, createRepository, updateRepository, deleteReposotory} = require('../controllers/repositoriesController')
const { JWTMiddleware } = require('../middlewares/jwtTokenMiddleware');

router.get('/user?', JWTMiddleware, getRepositoriesByUserId);
router.get('/:id', JWTMiddleware, getRepositoryById);

router.post('/', JWTMiddleware, createRepository);

router.put('/:id', JWTMiddleware, updateRepository);

router.delete('/:id', JWTMiddleware,deleteReposotory);

module.exports = router;
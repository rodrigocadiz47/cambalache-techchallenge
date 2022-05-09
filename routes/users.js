const express = require('express');
const router = express.Router();
const {createUser, updateUser, changePassword, getUserById, deleteUser} = require('../controllers/usersController');
const { JWTMiddleware } = require('../middlewares/jwtTokenMiddleware');

router.get('/:id', JWTMiddleware, getUserById);

router.post('/register', createUser);

router.put('/update/:id/account', JWTMiddleware, updateUser);

router.put('/update/:id/password', JWTMiddleware, changePassword);

router.delete('/delete/:id', JWTMiddleware, deleteUser);



module.exports = router;
const express = require('express');
const router = express.Router();
const {logOut} = require('../controllers/loginController')
const { JWTMiddleware } = require('../middlewares/jwtTokenMiddleware');

router.get('/logout', JWTMiddleware, logOut);

module.exports = router;
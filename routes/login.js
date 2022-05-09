const express = require('express');
const router = express.Router();
const {generateToken, logOut} = require('../controllers/loginController')
const {getLoginRecordsByUserId} = require('../controllers/loginRecordController');
const { JWTMiddleware } = require('../middlewares/jwtTokenMiddleware');

router.get('/attemps?', getLoginRecordsByUserId);

router.post('/', generateToken);
router.get('/logout', JWTMiddleware, logOut);

module.exports = router;
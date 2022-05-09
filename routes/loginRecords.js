const express = require('express');
const { getLoginRecordsByUserId } = require('../controllers/loginRecordController');
const { JWTMiddleware } = require('../middlewares/jwtTokenMiddleware');
const router = express.Router();

router.get('/?', JWTMiddleware, getLoginRecordsByUserId);

module.exports = router;
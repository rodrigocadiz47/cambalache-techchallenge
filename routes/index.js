const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const loginRoutes = require('./login');
const repositoriesRoutes = require('./repositories');
const logoutRoutes = require('./logout')
const loginRecodsRoutes = require('./loginRecords')

router.use('/login/records', loginRecodsRoutes)
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/users', usersRoutes);
router.use('/repositories', repositoriesRoutes);

module.exports = router;
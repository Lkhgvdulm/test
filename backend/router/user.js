const express = require('express');
const { register, login } = require('../controller/User');
const router = express.Router();
router.route('/api/v1/register').post(register);
router.route('/api/v1/login').post(login);

module.exports = router;

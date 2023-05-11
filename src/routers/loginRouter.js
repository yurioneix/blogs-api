const express = require('express');

const User = require('../controllers/user.controller');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, User.getUserLogin);

module.exports = router;
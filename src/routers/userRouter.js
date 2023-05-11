const express = require('express');
const User = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, User.createUser);

module.exports = router;

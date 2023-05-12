const express = require('express');
const User = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateUser, User.createUser);

router.get('/', validateJWT, User.getUsers);

module.exports = router;

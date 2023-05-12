const express = require('express');

const Category = require('../controllers/category.controller');

const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, Category.createCategory);

module.exports = router;
const express = require('express');

const Category = require('../controllers/category.controller');

const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, Category.createCategory);

router.get('/', validateJWT, Category.getCategories);

module.exports = router;
const express = require('express');

const BlogPost = require('../controllers/blogPost.controller');

const validateJWT = require('../auth/validateJWT');

const validateBlogPost = require('../middlewares/validateBlogPost');

const router = express.Router();

router.post('/', validateJWT, validateBlogPost, BlogPost.createBlogPost);

module.exports = router;
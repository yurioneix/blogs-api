const BlogPostService = require('../services/blogPost.service');

const createBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;

    const { id } = req.user.dataValues;

    const newBlogPost = await BlogPostService.createBlogPost(title, content, categoryIds, id);

    return res.status(201).json(newBlogPost);
};

module.exports = { createBlogPost };
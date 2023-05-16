const { findByCategory } = require('../services/blogPost.service');

const validateBlogPost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    const checkCategory = await findByCategory(categoryIds);

    if (checkCategory.some((category) => category === null)) {
        return res.status(400).json({
            message: 'one or more "categoryIds" not found',
          });
    }
    if (title === '' || content === '') {
        return res.status(400).json({
            message: 'Some required fields are missing',
          });
    }

    return next();
};

module.exports = validateBlogPost;
const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const findByCategory = async (categories) => {
    const checkExistingCategory = await Promise.all(categories.map(async (category) => {
        const findCategories = await Category.findByPk(category);
        return findCategories;
    }));
    return checkExistingCategory;
};

const createBlogPost = async (title, content, categoryIds, userId) => {
    const categories = await findByCategory(categoryIds);

    const result = await sequelize.transaction(async (t) => {
        const newBlogPost = await BlogPost.create({ title, content, userId }, { transaction: t });

        categories.map((category) => PostCategory.create({ 
                categoryId: category.dataValues.id, 
                postId: newBlogPost.dataValues.id, 
            }), { transaction: t });
        return newBlogPost;
    });

    return result;
}; 

module.exports = { createBlogPost, findByCategory };
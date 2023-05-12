const CategoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body; 

    if (name === undefined) {
        return res.status(400).json({ message: '"name" is required' }); 
    }

    const newCategory = await CategoryService.createCategory(name);
    console.log('newCategory', newCategory);

    return res.status(201).json(newCategory);
};

const getCategories = async (req, res) => {
    const categories = await CategoryService.getCategories();

    return res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };
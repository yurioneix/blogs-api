/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', 
    {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
        },
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
        },
    },
    {
        timestamps: false, 
        underscored: true,
        tableName: 'post_categories'
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories', 
            through: PostCategory,
            foreignKey: 'categoryId', 
            otherKey: 'postId'
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            through: PostCategory,
            foreignKey: 'post_id', 
            otherKey: 'categoryId'
        })
    }

    return PostCategory;
};

module.exports = PostCategoryModel;
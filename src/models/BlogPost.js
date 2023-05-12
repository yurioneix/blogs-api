/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        published: DataTypes.DATE, 
        updated: DataTypes.DATE,
    },
    {
        timestamps: false,
        underscored: false,
        tableName: 'blog_posts'
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'user_id',  as: 'users'});
    };

    return BlogPost;
};

module.exports = BlogPostModel;
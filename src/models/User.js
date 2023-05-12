/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, 
    {
        timestamps: false,
        underscored: true,
        tableName: 'users'
    });

    User.associate = (models) => {
        User.hasMany(models.BlogPost, { foreignKey: 'user_id', as: 'posts'});
    };

    return User;
};

module.exports = UserModel;
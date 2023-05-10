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
        },
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, 
    {
        timestamps: false,
        underscored: false,
    });

    return User;
};

module.exports = UserModel;
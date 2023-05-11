const { User } = require('../models');

const getByEmailAndPassword = async (email, password) => {
    const getUser = await User.findOne({ where: { email, password } });

    return getUser;
};

const getByEmail = async (email) => {
    const getUserByEmail = await User.findOne({ where: { email } });
    console.log('getuserbyemail', getUserByEmail);
    return getUserByEmail;
};

const createUser = async (user) => {
    const {
        displayName, 
        email, 
        password,
        image,
    } = user;

    const newUser = await User.create({ 
        displayName, 
        email, 
        password,
        image,
    });
    console.log('newUser', newUser);

    return newUser;
};

module.exports = { getByEmailAndPassword, getByEmail, createUser };

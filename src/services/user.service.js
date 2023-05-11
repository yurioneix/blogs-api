const { User } = require('../models');

const getByEmailAndPassword = async (email, password) => {
    const getUser = await User.findOne({ where: { email, password } });

    return getUser;
};

module.exports = { getByEmailAndPassword };

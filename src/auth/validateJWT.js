const jwt = require('jsonwebtoken');

const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'fluminensecampeãodalibertadores2023';

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, secret);

        const user = await UserService.getByEmail(decoded.data.email);

        if (!user) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

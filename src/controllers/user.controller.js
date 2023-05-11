const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'fluminensecampeãodalibertadores2023';

const getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === undefined || password === undefined) throw new Error();
        
        const userLogin = await UserService.getByEmailAndPassword(email, password);
    
        console.log('userLogin', userLogin);
    
        if (!userLogin) return res.status(400).json({ message: 'Invalid fields' });
    
        const jwtConfig = { 
            expiresIn: '7d',
            algorithm: 'HS256',
        };
    
        const token = jwt.sign({ data: { email } }, secret, jwtConfig);
        console.log('token', typeof token);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({
            message: 'Some required fields are missing',
          });
    }
};

module.exports = {
    getUserLogin,
};
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

        return res.status(200).json({ token });
    } catch (error) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
};

const createUser = async (req, res) => {
    const user = req.body;

    const verifyExistingEmail = await UserService.getByEmail(user.email);

    if (verifyExistingEmail) {
        return res.status(409).json({
            message: 'User already registered',
        }); 
    }

    await UserService.createUser(user);

    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const { displayName, email, password, image } = user;
    const token = jwt.sign({ data: { 
        displayName, 
        email, 
        password,
        image } }, secret, jwtConfig);

    return res.status(201).json({ token });
};

module.exports = {
    getUserLogin,
    createUser, 
};
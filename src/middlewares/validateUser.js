const validateUser = (req, res, next) => {
    const { displayName, email, password } = req.body;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailValidate = emailRegex.test(email);
    if (displayName.length < 8) {
        return res.status(400).json({ 
            message: '"displayName" length must be at least 8 characters long',
        }); 
    }
    if (!emailValidate) {
        return res.status(400).json({
            message: '"email" must be a valid email',
          });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: '"password" length must be at least 6 characters long',
          });
    } return next();
}; 

module.exports = validateUser;
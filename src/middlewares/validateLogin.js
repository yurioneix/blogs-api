const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        return res.status(400).json({
            message: 'Some required fields are missing',
          });
    }
    // if (email === undefined || password === undefined) {
    //     return res.status(400).json({
    //         message: 'Some required fields are missing',
    //       });
    // }
    return next();
};

module.exports = validateLogin;

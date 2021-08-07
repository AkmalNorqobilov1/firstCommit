const jwt = require('jsonwebtoken');
exports.isAuth = async (req, res, next)=>{
    try {
        const token  = req.headers.authorization;
        const isValidToken = await jwt.verify(token, process.env.PRIVATE_KEY);
        if(!isValidToken) {
            res.status(400).json({msg: "Invalid token"});
        }
        req.user = isValidToken;
            next();
        
    } catch (err) {
        res.status(400).json({msg: "You do not have access"});
    }
};
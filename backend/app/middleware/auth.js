const jwt = require('jsonwebtoken')


const AuthMiddileware = (req,res,next)=>{
    const token = req.headers['authorization'] || req.headers['Authorization'] || req.headers['x-access-token'];
    if(!token){
        return res.status(402).json({
            status: false,
            message: "No token provided. Please provide valid token!"
        })}
        const bearertoken = token.split(' ')[1];
        if(!bearertoken){
            return res.status(401).json({
                status: false,
                message: 'Unauthorized Access. Token Invalid!'
            })
        }
        try{
            const decoded = jwt.verify(bearertoken, process.env.JWT_SECRET);
            req.user = decoded;
            console.log('Decoded User:', decoded)
        }catch(error){
            return res.status(400).json({
                status: false,
                message: 'Invalid Token!'
            })
        }
        return next();
}

module.exports = AuthMiddileware

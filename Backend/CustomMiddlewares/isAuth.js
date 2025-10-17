const jwt = require("jsonwebtoken");

const isAuth = async(req, res, next) => {

    try
    {
        const token = req.cookies.token;
        
        if(!token)
        {
            res.status(401).json({message:"User not verified", success: false});
            return;
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if(!decode)
        {
            res.status(401).json({message:"Invalid token", success: false}); 
            return;
        }

        req.id = decode.userId;
        next();

    }
    catch(authError)
    {
        console.log("Error while authenticating");
        res.status(401).json({message:"Error while authenticating", success: false});
    }

}

module.exports = isAuth;
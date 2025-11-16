const userModel = require("../MongoDB/models/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {

    try
    {
        const{email, password} = req.body;

        if(!email || !password)
        {
            res.status(400).json({
                message: "All fields are required",
                success: false
            });

            return;
        }

        const userExists = await userModel.findOne({email});

        if(!userExists)
        {
            res.status(401).json({
                message: "User does not exists",
                success: false
            });
            
            return;
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, userExists.password);

        if(!isPasswordCorrect)
        {
            res.status(401).json({
                message:"Wrong Password",
                success: false
            });

            return;
        }

        const tokenData = {userId: userExists._id}
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});
        
        res.status(200)
        .cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:"None", secure:true})
        .json({
            message:`Welcome ${userExists.fullname}`,
            user: {
                _id: userExists._id,
                fullname: userExists.fullname,
                email: userExists.email
            },
            success:true
        });

    }
    catch(loginError)
    {
        console.log(loginError);
        res.status(400).json({
            message:"Error while logging in.",
            success:false
        });
    }

}

module.exports = loginUser;

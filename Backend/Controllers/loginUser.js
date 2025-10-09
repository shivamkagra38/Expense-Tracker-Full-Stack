const userModel = require("../MongoDB/models/userModel.js");
const bcryptjs = require("bcryptjs");

const loginUser = async (req, res) => {

    try
    {
        const{email, password} = req.body;

        if(!email || !password)
        {
            res.status(400).json({
                message: "All fields are required",
                status: false
            });

            throw new Error("All fields are required");
        }

        const userExists = await userModel.findOne({email});

        if(!userExists)
        {
            res.status(400).json({
                message: "User does not exists",
                status: false
            });

            throw new error("Incorrect email or password")
        }


        const isPasswordCorrect = bcryptjs.compareSync(password, userExists.password);

        if(!isPasswordCorrect)
        {
            res.json(401).json({
                message:"Wrong Password",
                status: false
            });
        }

        res.status(200).json({
            message:"Login Successful",
            status: true
        });

    }
    catch(loginError)
    {
        console.log(loginError);
    }

}

module.exports = loginUser;
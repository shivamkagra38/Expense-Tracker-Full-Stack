const userModel = require("../MongoDB/models/userModel.js");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {

    try
    {
        const{fullname, email, password} = req.body;
        
        if(!fullname || !email || !password)
        {
            // Status code 400 -> Bad request
            res.status(400).json({
                message: "All fields are required",
                success: false
            });

            return;
        }

        //checking if user exists already or not
        const userExists = await userModel.find({email:email});

        if(userExists.length > 0)
        {
            res.status(400).json({
                message:"User already exists",
                success: false
            });
            
            return;
        }

        //Encrypting password using bcryptjs module
        const encryptedPassword = bcryptjs.hashSync(password,10);

        //Creating user
        await userModel.create({
            fullname,
            email,
            password: encryptedPassword
        });

        res.status(201).json({
            message: "Account has been registerd successfully!",
            success: true
        });

    }
    catch(registerError)
    {
        res.status(401).json("Error while registering");
        console.log("Error while registering");
    }

}

module.exports = registerUser;
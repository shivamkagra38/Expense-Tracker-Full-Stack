const logoutUser = (req, res) => {

    try
    {
        res.status(200)
        .cookie("token", null, {maxAge:0, httpOnly:true, sameSite:"None", secure:true})
        .json({
            message: "Logged out successfully",
            status:true
        });
    }
    catch(logoutError)
    {
        console.log("Error while logging out.");

        res.status(401).json({
            message: "Error while logging out",
            status: false
        });
    }

}

module.exports = logoutUser;
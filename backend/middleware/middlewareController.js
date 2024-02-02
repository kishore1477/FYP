import jwt from "jsonwebtoken"
import User from "../model/User.js"

const Userauth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
         return    res.status(401).json({ msg: "Please enter a token for authorization" })
        }
        const { userID } = jwt.verify(authorization, process.env.JWT_SECRET_KEY)
        if (!userID) {
           return  res.status(401).json({ msg: "Invalid token" })
        }
        // fetch user form UserId - exclude password from the user details and add user details in req object for further utilize in the application 
        req.user = await User.findById(userID).select('-password')
        next()
    } catch (error) {
        res.status(500).json({ msg: "Internal error Occured", error })
    }


}
export default Userauth
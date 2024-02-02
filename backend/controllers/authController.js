 
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator';
import User from "../model/User.js";

class AuthController {
    // User Register
    static UserRegisteration = async (req, res) => {
        try {
            console.log("body ", req.body)
            
            const { firstName,lastName,email,address, contact, registerationID, age,password } = req.body;
            // const { name, registerationID, password } = req.body;
            // Check if required fields are provided
            if (!firstName || !registerationID || !password) {
                return res.status(400).json({ "message": 'All fields are required - name,registerationID,password' });
            }
            // Check if the registerationID already exists
            const findsavedUser = await User.findOne({ registerationID });

            if (findsavedUser) {
                return res.status(409).json({ "message": 'registerationID already exists' });
            }
            // Generate hash for the password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            // Create a new user
            const UserData = new User({
                firstName,lastName,email,address, contact, registerationID,age,
                password: hashPass,
            });
            // Save the user to the database
            await UserData.save();
            // Fetch the user after saving
            const findsavedUserAfterSaved = await User.findOne({ registerationID });

            // Check if the user was found after saving
            if (!findsavedUserAfterSaved) {
                // If not found, something went wrong
                return res.status(500).json({ "message": 'Error during signup: User not found after saving' });
            }
            // Generate JWT token 
            const token = jwt.sign({ userID: findsavedUserAfterSaved._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
            // Respond with success and token
            return res.status(200).json({ "token": token, "message": "Signup successfully." });

        } catch (error) {
            // Handle unexpected errors
            return res.status(500).json({ "message": 'Internal server error', error });
        }

    }

    //  User login 
    static UserLogin = async (req, res) => {
        try {
            const { registerationID, password } = req.body
console.log("body login", req.body)
            if (!registerationID || !password) {
              return  res.status(400).json({ "message": "All field are required" })
            }
            const user = await User.findOne({ registerationID })
            console.log("user find", user)
            if (!user) {
              return  res.status(400).json({ "message": `Account doesn't exist with ${registerationID}` })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            console.log("isMatch", !isMatch)
            if (user.registerationID !== registerationID || !isMatch) {
             return   res.status(400).json({ "message": "Invalid credentials" })
            }
           
            //  token gnerate for login
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            const { name, registerationID: userregisterationID } = user
            const userDetails = {
                name, registerationID: userregisterationID
            }
          return  res.status(200).json({ "loginToken": token, "message": "Login Successfully", userDetails })
        } catch (error) {
          return  res.status(401).json({ "message": "Internal server error occured" ,"error":`${error}`})

        }
    }
    // user change password 
    static changePassword = async (req, res) => {
        const { password, password_confirm } = req.body
        if (password && password_confirm) {
            if (password === password_confirm) {
                const salt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(password, salt)

                await User.findByIdAndUpdate(req.user._id, { $set: { password: hashPass } })
                res.status(200).json({ msg: "Password changed successfully" })
            } else {

                res.status(400).json({ msg: "password does not  match" })
            }
        } else {
            res.status(400).json({ msg: "All fields are required!" })
        }
    }
    static LoggedUserData = (req, res) => {
        const userDetails = req.user
        console.log("userDetails",userDetails)
             return    res.status(200).json({data: userDetails})
            }

  

    static passwordReset = async (req, res) => {
        const { password, password_confirm } = req.body

        const { id, token } = req.params

        const user = await User.findById(id)

        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            // let verifyToken = jwt.verify(token, new_secret)
            // 
            if (password && password_confirm) {
                if (password === password_confirm) {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.status(200).send({ "status": "success", "message": "Password Reset Successfully" })
                } else {
                    res.status(400).send("Password does not match!")
                }
            } else {
                res.status(400).send("All field are required.")

            }
        } catch (error) {
            res.status(400).send("Internal Server Error Occured")

        }
    }

    static Contact = async (req, res) => {
        // handle request body  parameters error
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const { name, registerationID, msg } = req.body

        if (name && registerationID && msg) {
            const contactData = new Contact({
                name: name,
                registerationID: registerationID,
                msg: msg,

            })
            const UserDataSave = await contactData.save()
            res.status(200).json({ msg: 'Thanks for contact us, we will touch with you within in 2 days.' })

        } else {
            res.status(400).json({ msg: 'All fields are required' })
        }

    }
    static getAllSignUpUsers = async (req, res) => {
        try {
            // Fetch all users from the database excluding the password field
            const allUsers = await User.find({}, '-password');
            
            // Return the user data as a response
            return res.status(200).json(allUsers);
        } catch (error) {
            // Handle unexpected errors
            return res.status(500).json({ "message": 'Internal server error', error });
        }
    }

}

export default AuthController

import { User } from "../models/userSchema.js"
import generateToken from "../utils/genrateToken.js"


export const RegisterUser = async (req,res) => {

    try {
        
        const {userName, email,  contactNumber,password} = req.body

       
        
        
        // Check if user already exist

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message: "EmailId is already Registered. Try Logging In"})
        }

        // validate ContactNumber format



        // create a new user

        const newUser =  await User.create({
            userName,
            email,
            contactNumber,
            password  // passsword will be hashed by presave middleware
        })

        generateToken(res, newUser._id)

        res.status(201).json({message: "Registration Sucessful"})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Registration Failed"})
    }
}
import { User } from "../models/userSchema.js";
import generateToken from "../utils/genrateToken.js";

const isAdminEmail = (email) => {
  return email.toLowerCase().endsWith('@getaway.com')
}


export const RegisterUser = async (req, res) => {
  try {
    const { userName, email, contactNumber, password } = req.body;

    // Check if user already exist

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "EmailId is already Registered. Try Logging In" });
    }

    const role = isAdminEmail(email) ? "admin" : "passenger"

    // create a new user

    const newUser = await User.create({
      userName,
      email,
      contactNumber,
      password, // passsword will be hashed by presave middleware
      role,
    });

    generateToken(res, newUser._id);

    res.status(201).json({ message: "Registration Sucessful" ,
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            role: newUser.role,
        }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration Failed" })
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User Not found" });
    }

    // check password is matching

    const isMatch = await existingUser.matchPassword(password)
    if (!isMatch){
       return res.status(400).json({message : "Invalid Password"})
    }
     
    

    generateToken(res, existingUser._id )


    res.status(200).json({message: "Login Successful" ,
         user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            role : existingUser.role
        }
    })
    
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: "Login Failed", error: error.message });
  }
};

export const LogoutUser =  async (req,res) => {
    res.cookie('token', "" , {
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires : new Date(0)
    }).json({message: "Logout Successful"})
}



export const getUserProfile = async (req,res) => {
  res.status(200).json({
    id: req.user._id,
    userName : req.user.userName,
    email: req.user.email,
    contactNumber: req.user.contactNumber,
    role : req.user.role
  })
}
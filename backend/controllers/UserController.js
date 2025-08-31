import { User } from "../models/userSchema.js";
import generateToken from "../utils/genrateToken.js";

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

    // validate ContactNumber format

    // create a new user

    const newUser = await User.create({
      userName,
      email,
      contactNumber,
      password, // passsword will be hashed by presave middleware
    });

    generateToken(res, newUser._id);

    res.status(201).json({ message: "Registration Sucessful" ,
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
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

    // jwt token

    generateToken(res, existingUser._id )


    res.status(201).json({message: "Login Successful" ,
         user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.password
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
        sameSite: 'stict',
        expires : new Date(0)
    })
}

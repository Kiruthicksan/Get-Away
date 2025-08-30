import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "UserName is required"],
    trim : true
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    trim: true,
    lowercase: true,
     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  contactNumber:{
    type: String,
    required: true,
     match: [/^[\+]?[1-9]\d{9,14}$/, "Please enter a valid contact number"]
  },
  password: {
    type : String,
    required: true,
    minlength: [8, "The password should be atlest 8 characters"]
  },
  role: {
    type : String,
    enum: ['admin',"passenger"],
    default: 'passenger'
  }


}, {timestamps: true});

// pre save middleware to hash the password before save

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next()
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash( this.password, salt )
    next()
})

// Method to compare password while login

userSchema.methods.matchPassword = async function (enteredPassWord) {
    return await bcrypt.compare(enteredPassWord, this.password)
}

const User = mongoose.model('User', userSchema)

export {User}

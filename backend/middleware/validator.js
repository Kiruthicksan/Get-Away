export const ValidateRegisterUser = (req, res, next) => {

    const {userName, email, contactNumber, password} = req.body

    // checks all feild
    if (!userName || !email || !contactNumber || !password){
            return res.status(400).json({message: "Please fill All feilds"})
        }

    // Validate email

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)){
        return res.status(400).json({message : "Invalid Email Address"})
    }

    const contactNumberRegex = /^\d{10}$/

    if (!contactNumberRegex.test(contactNumber)){
        return res.status(400).json({message : "Invalid contact Number"})
    }

    next()
}
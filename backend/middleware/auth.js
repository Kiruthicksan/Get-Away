import jwt from 'jsonwebtoken'
const protect = (req,res,next) => {
    try {
        
        const token = req.cookies.token

        // checking token

        if (!token){
            return res.status(401).json({message: "Not Authorized"})
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)
    } catch (error) {
        console.error(error)
        res.status(401).json({message: "Unauthorized. Token Invalid"})
    }
}
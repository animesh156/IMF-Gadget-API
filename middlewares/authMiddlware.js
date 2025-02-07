const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

const protect = async (req,res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // get token fro header
            token = req.headers.authorization.split(" ")[1];
           
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // fetch user from datbse
            req.user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true } // Exclude password
            });

            if (!req.user) {
                return res.status(401).json({ error: "User not found" });
            }

            next();

        } catch (error) {
             console.log(error)
             res.status(401).json({error: "Not authorized, token failed"})
        }
    } else {
        res.status(401).json({error: "Not authorized, no token"})
    }

   
}


module.exports = {protect}
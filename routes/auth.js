const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");

// Register user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(400).json({ error: "Please provide required fields" });
    }

    const userExist = await prisma.user.findUnique({ where: {email} });

    if (userExist) {
     return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    if (user) {
      return res.status(201).json({
        id: user.id,

        email: user.email,

        token: generateToken(user.id),
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({error: "Server-side error"})
  }
});


// login user
router.post('/login', async (req,res) => {
   

    try {
        const {email, password} = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: "Please provide email and password" });
        }
    

        const user = await prisma.user.findUnique({ where: {email}})

        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).json({message: "User logged in successfully", token: generateToken(user.id), })
        } else {
          return res.status(400).json({ error: "Invalid credentials" });
        }
        
    } catch (error) {
        return res.status(500).json({error: "Server-side error"})
    }
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3h'
    })
}


module.exports = router
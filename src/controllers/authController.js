const User = require('../models/User');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

function normalizeEmail(email){
 return email.trim().toLowerCase();
}

async function hashPassword(plainPass){
    return bcrypt.hash(plainPass, SALT_ROUNDS);
}

async function checkIfUserExists(email){
    const user = await User.findOne({email});
    return !!user;
}

async function createUser(email,passwordHash){
   return User.create({email, password:passwordHash});
}

// Register user and check if request is valid or if user already exist.
async function register(req,res){
    try{
    let {email,password} = req.body;
    
    // Basic validation
    if (!email || !password){
        return res.status(400).json({error:"Email and password are required"});
    }

    email = normalizeEmail(email);

    if (await checkIfUserExists(email)){
        return res.status(409).json({error:"User with this email already exists"});
    }

    // Create hashed password and use that to create user
    const passwordHash = await (hashPassword(password));
    const user = await createUser(email,passwordHash);
    
    return res.status(201).json({
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
    });
}catch(err){
    console.error("Register error:", err);
    return res.status(500).json({error: "Could not create user"});

}
}

module.exports = {register};
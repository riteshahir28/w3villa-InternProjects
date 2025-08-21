const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res)=>{
  
    try {
     
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 6);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
  
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
//Login : 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User find
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWT Token generate
    const token = jwt.sign(
      { id: user._id, email: user.email, name:user.name },
      process.env.JWT_SECRET, // ✅ yaha .env use karo
      { expiresIn: "1h" }
    );
    console.log(token);
    
    // Cookie set karo
    res.cookie("token", token, {
      httpOnly: true, // JS se access nahi hoga
      secure: false,  // agar HTTPS hoga to true kar dena
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({ message: "Login successful",user:user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

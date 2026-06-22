const bcrypt = require("bcrypt");
const Auth = require("../models/auth");
const jwt = require('jsonwebtoken')

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required!",
        });
      }

      const existingUser = await Auth.findOne({ email: email.trim() });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "User already exists!",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = new Auth({
        name,
        email,
        isVerified: true,
        password: passwordHash,
      });
      const data = await user.save();
      return res.status(201).json({
        status: true,
        message: "User registered successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal server error!",
      });
    }
  }

  //login
  async login(req, res){
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required!",
            });
        }

        const user = await Auth.findOne({ email: email.trim() });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password!",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password!",
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            status: true,
            message: "Login successful!",
            data: user,
            token: token
        });

    }catch(error){
        return res.status(500).json({
            status: false,
            message: "Internal server error!",
        });
    }
  }
}
module.exports = new AuthController();

const User = require('../models/user')
const passport = require("passport");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, photoUrl, isAdmin } = req.body; // Destructure the additional fields
    
    // Check if all fields are provided
    if (!name || !email || !password || !photoUrl || typeof isAdmin === 'undefined') {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ success: false, message: "User already exists" });
    }

    // Create a new user object with the provided data
    const newUser = new User({
      name,
      email,
      photoUrl,
      isAdmin,
    });

    // Set the password (ensure hashing is done in the model method)
    newUser.setPassword(password);

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return success response
    return res.status(201).json({
      success: true,
      user: savedUser,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(400).json({ success: false, message: "Error saving user", err });
  }
};



const loginUser = async (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(500).json({success: false, err});
    }
    if (!user) {
      return res.status(404).json({success: false, message: "User not found"});
    }
    if (!user.isValidPassword(req.body.password)) {
      return res.status(401).json({success: false, message: "Password incorrect"});
    }
    passport.authenticate("local", (err, user, info) => {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({
          success: true,
          user
        });
      });
    },)(req, res, next);
  })
}

const logoutUser = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // res.redirect('/login');
  });
  return res.status(200).json({success: true, message: "User logged out"});
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}

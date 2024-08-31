const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ user_id: username }).exec();
    console.log("User found:", user); // for testing
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const pwd = await User.findOne({ password: password });
    if (!pwd) return res.status(400).json({ message: "Invalid password" });

    res.json({ success: `User ${user} is logged in` }); //to send unique res
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleUserRegister = async (req, res) => {
  try {
    const parsedData = req.body;

    const userId = uuidv4(); // Generate a unique ID for the user
    const userName = parsedData.name;
    const userPassword = parsedData.password;
    const userEmail = parsedData.email;
    const userPhone = parsedData.phone;
    const userType = parsedData.user_type;

    const createUser = await User.create({
      userId,
      userName,
      userPassword,
      userEmail,
      userPhone,
      userType
    });
    if (!createUser) {
      return res.status(400).json({ message: "User registration failed" });
    }

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during registration.",
      error: error.message,
    });
  }
};

module.exports = { handleUserLogin, handleUserRegister };

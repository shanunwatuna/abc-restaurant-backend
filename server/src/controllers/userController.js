import User from "../models/User.js";

// fetch all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

// fetch one user
export const getUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(404).json({ message: "ID parameter missing" });
  try {
    const user = await User.findOne({ id: userId }).exec();
    if (!user) return res.status(404).json({ message: "No users found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new user
export const createNewUser = async (req, res) => {
  // create auto generated user Id
  const userId = `USR${Math.floor(100000 + Math.random() * 900000)}`;
  const user = new User({
    id: userId,
    user_name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    user_type: req.body.user_type,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ message: `New user created ID: ${newUser.id}.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const checkUser = async (req, res) => {
  const { username, password, user_type } = req.body;

  if (!username || !password || !user_type) {
    return res.status(400).json({ message: "Request parameters missing" });
  }

  try {
    const findUser = await User.findOne({
      email: username,
      password: password,
      user_type: user_type,
    }).exec();

    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const response = {
      user_id: findUser.id,
      user_type: findUser.user_type,
      email: findUser.email,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.query.id;
  const updateData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(`User ${userId} updated successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.query.id;
  try {
    const updatedUser = await User.findOneAndDelete({ id: userId });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(`User ${userId} deleted.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

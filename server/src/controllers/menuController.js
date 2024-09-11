import Menu from "../models/Menu.js";

// fetch all menu items
export const getAllItems = async (req, res) => {
  const items = await Menu.find();
  if (!items) {
    return res.status(204).json({ message: "No users found" });
  }
  res.json(items);
};

// fetch one user
export const getItem = async (req, res) => {
  const menuId = req.params.id;
  if (!menuId) return res.status(404).json({ message: "ID parameter missing" });
  try {
    const item = await Menu.findOne({ id: menuId }).exec();
    if (!item) return res.status(404).json({ message: "No item found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new item
export const createNewItem = async (req, res) => {
  // create auto generated user Id
  const menuId = `ITM${Math.floor(100 + Math.random() * 900)}`;
  const user = new Menu({
    id: menuId,
    item_name: req.body.name,
    price: req.body.price,
    photo_url: req.body.photo_url,
    category: req.body.category,
  });

  try {
    const newItem = await user.save();
    res.status(201).json({ message: `New item created ID: ${newItem.id}.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  const menuId = req.query.id;
  const updateData = req.body;
  try {
    const updatedUser = await Menu.findOneAndUpdate(
      { id: menuId },
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).send("Menu item found");
    }
    res.json(`User ${menuId} updated successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteMenu = async (req, res) => {
  const menuId = req.query.id;
  try {
    const updatedUser = await Menu.findOneAndDelete({ id: menuId });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(`User ${menuId} deleted.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

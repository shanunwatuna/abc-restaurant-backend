import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MenuSchema = new Schema({
  id: { type: String },
  item_name: { type: String },
  price: { type: Number },
  photo_url: { type: String },
  category: { type: String },
});

export default model("Menu", MenuSchema);

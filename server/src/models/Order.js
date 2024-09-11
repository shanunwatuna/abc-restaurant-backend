import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  id: { type: String },
  user_id: { type: Schema.Types.String, ref: "User" },
  menu_items: [
    {
      menu_id: { type: String },
      quantity: { type: Number },
    },
  ],
  total: { type: Number },
});

export default model("Order", OrderSchema);

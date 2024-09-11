import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user_name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  user_type: { type: String },
});

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  id: { type: String },
  user_id: { type: mongoose.Schema.Types.String, ref: "User" },
  branch: { type: String },
  time: { type: String },
  pax: { type: String },
  phone: { type: String },
});

export default mongoose.model("Reservation", ReservationSchema);

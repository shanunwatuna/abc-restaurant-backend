import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

// fetch all reservations
export const getAllReservatons = async (req, res) => {
  const reservations = await Reservation.find();
  if (!reservations) return res.status(204).json({ message: "No reservations found" });
  res.json(reservations);
};

// fetch one user
export const getReservation = async (req, res) => {
  const rsvId = req.params.id;
  if (!rsvId) return res.status(404).json({ message: "ID parameter missing" });
  try {
    const reservation = await User.findOne({ id: rsvId }).exec();
    if (!reservation) return res.status(404).json({ message: "No reservations found" });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new user
export const createNewReservation = async (req, res) => {
  // create auto generated user Id
  const userId = `RSV${Math.floor(100000 + Math.random() * 900000)}`;
  try {
    // Check if user exists
    const user = await User.findOne({ id: req.body.user_id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please login to make reserversations." });
    }

    // Create new reservation
    const reservation = new Reservation({
      id: userId,
      user_id: req.body.user_id,
      branch: req.body.branch,
      time: req.body.time,
      pax: req.body.pax,
      phone: req.body.phone,
    });

    const response = await reservation.save();
    res
      .status(201)
      .json({ message: `Reservation created ID: ${response.id}.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  const rsvId = req.query.id;
  const updateData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: rsvId },
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).send("Reservation not found");
    }
    res.json(`User ${rsvId} updated successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteReservation = async (req, res) => {
  const rsvId = req.query.id;
  try {
    const response = await User.findOneAndDelete({ id: rsvId });
    if (!response) {
      return res.status(404).send("User not found");
    }
    res.json(`Reservation ${rsvId} deleted.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

import express from "express";
import {
  getAllReservatons,
  createNewReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// route: /reservations/*
router
  .route("/")
  .get(getAllReservatons)
  .post(createNewReservation)
  .put(updateReservation)
  .delete(deleteReservation);

export default router;

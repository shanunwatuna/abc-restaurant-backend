import express from "express";
import {
  getAllOrders,
  createNewOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// route: /orders/*
router.route("/").get(getAllOrders).post(createNewOrder);

export default router;

import express from "express";
import {
  getAllUsers,
  getUser,
  checkUser,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// route: /user/*
router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:id").get(getUser);

router.route("/login").post(checkUser);

export default router;

import express from "express";
import {
  getAllItems,
  getItem,
  createNewItem,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

const router = express.Router();

// route: /menus/*
router
  .route("/")
  .get(getAllItems)
  .post(createNewItem)
  .put(updateMenu)
  .delete(deleteMenu);

router.route("/:id").get(getItem);

export default router;

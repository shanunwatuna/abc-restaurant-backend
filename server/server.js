import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/users.js";
import reservationRouter from "./src/routes/reservations.js";
import menuRouter from "./src/routes/menus.js";
import orderRouter from "./src/routes/orders.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", userRouter);
app.use("/reservations", reservationRouter);
app.use("/menus", menuRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

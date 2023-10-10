import express from "express";
const router = express.Router();
import {
  getAllUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

router.get("/", getAllUser);
router.post("/register", registerUser);
router.route("/update/:id").put(updateUser);

export default router;

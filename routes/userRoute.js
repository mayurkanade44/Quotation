import express from "express";
const router = express.Router();
import {
  changePassword,
  getAllUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

router.get("/", getAllUser);
router.post("/register", registerUser);
router.route("/update/:id").put(updateUser);
router.put("/passwordUpdate/:id", changePassword);

export default router;

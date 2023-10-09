import express from "express";
import {
  addValue,
  deleteValue,
  editValue,
  getAllValues,
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/value").post(addValue).get(getAllValues);
router.route("/value/:id").put(editValue).delete(deleteValue);

export default router;

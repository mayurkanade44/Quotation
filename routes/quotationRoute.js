import express from "express";
import {
  createQuotation,
  getAllQuotation,
} from "../controllers/quotationController.js";
const router = express.Router();

router.route("/").post(createQuotation).get(getAllQuotation);

export default router;

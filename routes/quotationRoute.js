import express from "express";
import {
  createQuotation,
  getAllQuotation,
  getQuotation,
} from "../controllers/quotationController.js";
const router = express.Router();

router.route("/").post(createQuotation).get(getAllQuotation);
router.route("/details/:id").get(getQuotation);

export default router;

import express from "express";
import {
  createQuotation,
  editQuotation,
  getAllQuotation,
  getQuotation,
} from "../controllers/quotationController.js";
const router = express.Router();

router.route("/").post(createQuotation).get(getAllQuotation);
router.route("/details/:id").get(getQuotation).put(editQuotation);

export default router;

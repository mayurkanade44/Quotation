import express from "express";
import {
  createQuotation,
  editQuotation,
  getAllQuotation,
  getQuotation,
  revisedQuotation,
} from "../controllers/quotationController.js";
const router = express.Router();

router.route("/").post(createQuotation).get(getAllQuotation);
router.route("/details/:id").get(getQuotation).put(editQuotation).post(revisedQuotation)

export default router;

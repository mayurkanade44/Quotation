import express from "express";
import {
  createQuotation,
  deleteQuotation,
  editQuotation,
  getAllQuotation,
  getQuotation,
  revisedQuotation,
  sendQuotation,
} from "../controllers/quotationController.js";
const router = express.Router();

router.route("/").post(createQuotation).get(getAllQuotation);
router
  .route("/details/:id")
  .get(getQuotation)
  .put(editQuotation)
  .post(revisedQuotation)
  .delete(deleteQuotation);
router.put("/send/:id", sendQuotation)

export default router;

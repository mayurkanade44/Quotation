import express from "express";
import { createQuotation } from "../controllers/quotationController.js";
const router = express.Router();

router.post("/create", createQuotation);

export default router;

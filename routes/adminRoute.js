import express from 'express'
import { addValue } from '../controllers/adminController.js'
const router = express.Router()

router.route("/value").post(addValue)


export default router
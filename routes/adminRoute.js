import express from 'express'
import { addValue, getValues } from '../controllers/adminController.js'
const router = express.Router()

router.route("/value").post(addValue).get(getValues)


export default router
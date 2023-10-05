import Admin from "../models/adminModel.js";
import { capitalLetter } from "../utils/helperFunctions.js";

export const addValue = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({ msg: "Added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

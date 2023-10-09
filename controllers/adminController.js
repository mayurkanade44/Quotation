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

export const getValues = async (req, res) => {
  try {
    const values = await Admin.find();

    const salesPerson = values.filter(
      (item) => item.salePerson && item.salePerson !== null
    );
    const business = values.filter(
      (item) => item.business && item.business !== null
    );

    return res.json({ salesPerson, business });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

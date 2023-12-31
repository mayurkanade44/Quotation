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

export const getAllValues = async (req, res) => {
  try {
    const values = await Admin.find();

    const salesPerson = [];
    const business = [];
    values.map(
      (item) =>
        (item.salePerson &&
          salesPerson.push({
            id: item._id,
            label: item.salePerson.label,
            value: item.salePerson.value,
          })) ||
        (item.business &&
          business.push({
            id: item._id,
            label: item.business.label,
            value: item.business.value,
          }))
    );

    return res.json({ salesPerson, business });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editValue = async (req, res) => {
  const { id } = req.params;
  try {
    const value = await Admin.findById(id);
    if (!value) return res.status(404).json({ msg: "Value not found" });

    await Admin.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const deleteValue = async (req, res) => {
  const { id } = req.params;
  try {
    const value = await Admin.findById(id);
    if (!value) return res.status(404).json({ msg: "Value not found" });

    await Admin.findByIdAndDelete(id);

    return res.json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

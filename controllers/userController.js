import User from "../models/userModel.js";
import { capitalLetter } from "../utils/helperFunctions.js";

export const registerUser = async (req, res) => {
  const { name, password, role, email } = req.body;
  try {
    if (!name || !password || !email || !role)
      return res.status(400).json({ msg: "Please provide required values" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "Email id already exists" });

    const user = await User.create({
      name: capitalLetter(name),
      email,
      password,
      role: role.label,
    });

    return res.status(201).send({ msg: `${user.name} is created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.email !== email) {
      user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email id already exists" });
    }

    user.name = name;
    user.email = email;
    user.role = role.label;

    await user.save();

    return res.json({ msg: "User has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

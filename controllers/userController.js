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
      role,
    });

    return res.status(201).send({ msg: `${user.name} is created` });
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "Server error, try again later" });
  }
};

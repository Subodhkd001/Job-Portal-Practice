import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validate
    if (!name) {
      return res
        .status(400)
        .send({ message: "Name is required", success: false });
    }
    if (!email) {
      return res
        .status(400)
        .send({ message: "Email is required", success: false });
    }
    if (!password) {
      return res
        .status(400)
        .send({ message: "Password is required", success: false });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists please login", success: false });
    }

    // register user
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Register controller",
      error,
    });
  }
};

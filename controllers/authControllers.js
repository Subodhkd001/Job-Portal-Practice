import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // validate
    if (!name) {
      next("Name is required");
    }
    if (!email) {
      next("Email is required");
    }
    if (!password) {
      next("Password is required");
    }
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      next("User already exists please login");
    }

    // register user
    const user = await userModel.create({ name, email, password });
    // token
    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      next("Please provide all fields");
    }

    // find user by email
    const user = await userModel.findOne({ email }).select("+password")
    if(!user){
      next("Invalid Username or Password");
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){ 
      next("Invalid username or password");
    }

    user.password = undefined;

    // token
    const token = user.createJWT();

    res.status(200).json({ 
      success:true,
      message:"Login Successfuly",
      user,
      token
    })
  } catch (error) {}
};

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,   // extra validator package is used for validation of email
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be 6 character long"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// middlewares for bcrypt
userSchema.pre("save", async function () {  // isme callback/arrow function kaam nahi karta
  if(!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JSON webtoken  // here we are creating json web token
userSchema.methods.createJWT = function () { 
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: '1d'});
};        // payload, secret key, expires

export default mongoose.model("User", userSchema);

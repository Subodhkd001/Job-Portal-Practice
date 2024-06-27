import userModel from "../models/userModel.js";

//******** get user ***********/
export const getUserController = async(req,res,next) => {
    const user = await userModel.find({_id: req.user.userId})
    res.status(200).json({
        user
    })
}

// ******* update user ************
export const updateUserController = async(req,res,next) => {
    const {name, email, lastName, location} = req.body;
    if(!name || !email || !lastName || !location){
        next("All fields are required");
    }
    const user = await userModel.findOne({_id: req.user.userId})
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;

    user.save();
    const token = user.createJWT();
    res.status(200).json({ 
        user,
        token
    })
} 
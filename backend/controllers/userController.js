import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res)=>{
    

        try {
            const {fullName, username , password, confirmPassword ,gender } = req.body;
            if(!fullName || !username || !password || !confirmPassword || !gender){
                return res.status(400).json({message:"All fields are required"});
            }
            if(password != confirmPassword){
                return res.status(400).json({message:"Password is incorrect"});
            }
            const user = await User.findOne({username});
            if(user){
                return res.status(400).json({message:"Username already exit try different"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            //profilePhoto
            const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`
            await User.create({
                fullName,
                username,
                password: hashedPassword,
                profilePhoto:gender == "male" ? maleProfilePhoto : femaleProfilePhoto,
                gender,
            });
            return res.status(201).json({
                message: "Account created successfully.",
                success: true
            })
        } catch (error) {
                   console.error(error);
        }
        
};

export const login =  async (req, res) =>{

    try {
        const {username, password}=req.body;
        if( !username || !password ){
            return res.status(400).json({message:"All fields are required"});
        };
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message:"incorrect username",
                success: false
            })

        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(404).json({
                message:"Incorrect password",
                success: false
            })

        };
// Prepare data for the JWT containing the user's ID
const tokenData = {
    userId: user._id
  };
  
  // Generate a JWT using the user ID, secret key, and setting its expiry to 1 day
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  
  // Create a cookie named "token" that holds the JWT, set to expire in 1 day, marked as HttpOnly for security, 
  // and with SameSite set to 'strict' for additional security
  return res.status(200).cookie("token", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite:'strict'
  }).json({
    // Respond with user information for client-side use (ID, username, full name, profile photo URL)
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    profilePhoto: user.profilePhoto
  })

        
    } catch (error) {
        console.log(error);
    }

} 
    

export const logout = (req,res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "logged out successfully."
        })
    } catch (error) {

        console.log(error);
        
    }
}

export const getOtherUsers = async (req, res) => {
    try {

        const loggedInUserId = req.id;
        const OtherUsers =  await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(OtherUsers) 

    } catch (error) {
        console.log(error);
    }
}

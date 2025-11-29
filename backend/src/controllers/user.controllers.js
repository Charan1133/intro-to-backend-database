import {User} from "../models/user.model.js"; // or { User } if named export

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password, // hash later
    });

    return res.status(201).json({
      message: "User registered",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


 export const loginUser = async(req, res) =>{
  try{
    //Checking users 

    const {email, password} = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if(!user) return res.status(400).json({
      message:"User not found"
    });

    // compare passwords

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({
      message:"Invalid credentials"
    })

    res.status(200).json({
      message: "User Logged in",
      user:{
        id:user._id,
        email:user.email,
        username: user.username
      }
    })
  } catch(error){
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
};


export const logoutuser = async (req, res) =>{
  try {
    const {email}  = req.body;
    const user = await User.findOne({
      email
    });

    if (!user) return res.status(404).json ({
      message:"User not found"
    });

    res.status
    (200).json({
      message:"Logout Successfull"
    });
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error", error
    });
  }
};

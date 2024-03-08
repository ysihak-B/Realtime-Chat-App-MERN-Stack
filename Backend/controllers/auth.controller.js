import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCoockie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "password don't match"})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error: "username already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const profilePic = `https://ui-avatars.com/api/?name=${fullName}`

        const newUser = new User ({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: profilePic
        })

        generateTokenAndSetCoockie(newUser._id, res)

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log("Error in the signup controller", error.message)
        res.status(500).json({error: "Internal server error!!"})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Incorrect username or password!!"})
        }

        generateTokenAndSetCoockie(user._id, res)

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in the login controller", error.message)
        res.status(500).json({error: "Internal server error!!"})
    }
}

export const logout = (req, res) => {
    res.send('Logout Route')
    console.log('Logout Route')
}
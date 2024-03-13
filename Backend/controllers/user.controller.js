import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUser =  await User.find({_id: {$ne: loggedInUserId}})

        res.status(200).json(filteredUser)
    } catch (error) {
        console.error("Error in getUserForSidebar controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}
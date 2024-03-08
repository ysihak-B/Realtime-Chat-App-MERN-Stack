import jwt from "jsonwebtoken"

const generateTokenAndSetCoockie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
    
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, // MS
        httpOnly: true, // prevent XSS atackes  -> cross-site scripting atackes
        sameSite: "strict", //prevent CSRF atackes  -> cross-site request forgery atackes
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCoockie;
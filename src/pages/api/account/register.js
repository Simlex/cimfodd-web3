import cookie from "cookie";
import dbConnect from "../../../util/mongo";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import UserSchema from "../../../models/User";
import ErrorResponse from "../../../util/errorResponse";
const asyncHandler = require("../../../middleware/asyncHandler")


const register = asyncHandler(async (req, res) => {

    await dbConnect();

    console.log('registering user')

    // if (req.method === "POST") {
    let { firstName, lastName, email, address, userName, password } = req.body;

    // check if email exist
    const checkMail = await UserSchema.findOne({ email })
    if (checkMail) { return (new ErrorResponse(`${email} has already been used by another user`, 400)) }

    // check if username is already in use
    const checkUserName = await UserSchema.findOne({ userName })
    if (checkUserName) { return (new ErrorResponse(`${userName} has already been used by another user`, 400)) }

    // hash password
    password = await bcrypt.hash(password, 12)

    const user = await UserSchema.create({ firstName, lastName, email, address, userName, password })

    if (!user) return (new ErrorResponse(`user could not be created`, 500))

    // res.status(201).json({success:true,data:user})
    // sendCookie(user, 200, res)
    res.status(statusCode).cookie("token", token, options).json({ success: true, token })
    // }
});

// cookie function
// const sendCookie = (user, statusCode, res) => {
//     const token = jwt.sign({ id: user._id, email: user.email, userName: user.userName, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: "30d" })
//     const options = ({
//         expires: new Date(Date.now() + 2592000000),
//         httpOnly: true
//     })
//     res.status(statusCode).cookie("token", token, options).json({ success: true, token })
// }

export default register;

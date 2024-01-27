import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

//middleware to make sure only admin calls are allowed
export const adminOnly = TryCatch(async (req,res,next) => {
    const {id} = req.query;
    if(!id) return next(new ErrorHandler("Id not specified",401));
    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("Fake userID",401));
    if(user.role !== "admin") return next(new ErrorHandler("Admin protected routes",401));
    next();


})
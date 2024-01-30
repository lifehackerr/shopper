import mongoose from "mongoose";
const schema = new mongoose.Schema({
code:{
    type: String,
    required:[true,"please enter a valid coupon code"],
    unique: true,
    },
    amount:{
        type: Number,
        required:[true,"please enter a Discount Amount"],
    }
})
export const Coupon = mongoose.model("Coupon",schema);
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpiry: Date
}, { timestamps: true })

export default mongoose.model("User", userSchema)
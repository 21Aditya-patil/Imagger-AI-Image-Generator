import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const createToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured")
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const createOtp = () => ({
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    otpExpiry: Date.now() + 5 * 60 * 1000
})

const sendMail = async (email, otp) => {
    const emailUser = process.env.EMAIL || process.env.EMAIL_USER
    const emailPass = (process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD || "").replace(/\s/g, "")

    if (!emailUser || !emailPass) {
        throw new Error("Email service is not configured")
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: Number(process.env.EMAIL_PORT || 587),
        secure: (process.env.EMAIL_SECURE || "false") === "true",
        requireTLS: true,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        auth: {
            user: emailUser,
            pass: emailPass,
        }
    })

    await transporter.verify()

    const info = await transporter.sendMail({
        from: `"Imagger" <${emailUser}>`,
        to: email,
        subject: "Email Verification",
        text: `Your Imagger OTP is ${otp}. It expires in 5 minutes.`,
        html: `<h2>Your Imagger OTP is:</h2><h1>${otp}</h1><p>This OTP expires in 5 minutes.</p>`
    })

    if (!info.accepted?.length || info.rejected?.length) {
        throw new Error("OTP email was rejected by the mail provider")
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const normalizedEmail = email?.trim().toLowerCase()

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const exists = await userModel.findOne({ email: normalizedEmail })
        const { otp, otpExpiry } = createOtp()

        if (exists) {
            if (exists.isVarified) {
                return res.status(409).json({ message: "User already exists. Please login." })
            }

            const match = await bcrypt.compare(password, exists.password)
            if (!match) {
                return res.status(400).json({ message: "Invalid credentials!" })
            }

            await sendMail(normalizedEmail, otp)

            exists.name = name || exists.name
            exists.otp = otp
            exists.otpExpiry = otpExpiry
            await exists.save()

            return res.status(200).json({
                message: "OTP resent",
                userID: exists._id
            })
        }

        const pass = await bcrypt.hash(password, 10)

        const user = new userModel({
            name,
            email: normalizedEmail,
            password: pass,
            otp,
            otpExpiry
        })

        await sendMail(normalizedEmail, otp)
        await user.save()

        res.status(201).json({
            message: "OTP sent",
            userID: user._id
        })


    } catch (error) {
        console.error("Register failed:", error.message)
        res.status(500).json({ message: `Could not send verification email: ${error.message}` })
    }

}

export const verifyotp = async (req, res) => {
    try {
        const { userID, otp } = req.body

        if (!mongoose.Types.ObjectId.isValid(userID) || !otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        const user = await userModel.findById(userID)

        if(!user || user.otp != otp || user.otpExpiry < Date.now()){
            return res.status(400).json({ message: "Invalid OTP" })
        }

        user.isVarified = true
        user.otp = null
        user.otpExpiry = null

        await user.save()

        const token = createToken(user._id)

        res.json({ token, user })


    } catch (error) {
        console.error("OTP verification failed:", error.message)
        res.status(500).json({ message: "OTP verification failed" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const normalizedEmail = email?.trim().toLowerCase()

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        
        const user = await userModel.findOne({ email: normalizedEmail })
        if(!user) 
            return res.status(400).json({ message: "Invalid credentials!" })
        
        const match = await bcrypt.compare(password, user.password)

        if(!match)
            return res.status(400).json({ message: "Invalid credentials!" })

        if(!user.isVarified) {
            const { otp, otpExpiry } = createOtp()
            await sendMail(normalizedEmail, otp)

            user.otp = otp
            user.otpExpiry = otpExpiry
            await user.save()

            return res.status(200).json({
                message: "Email is not verified. OTP resent.",
                userID: user._id,
                requiresVerification: true
            })
        }

        const token = createToken(user._id)

        res.status(200).json({token, user})
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

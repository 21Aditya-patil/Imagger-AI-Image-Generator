import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const sendMail = async (email, otp) => {
    const transportor = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })

    await transportor.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<h2>Your OTP is: <h1>${otp}</h1> </h2>`
    })
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exists = await userModel.findOne({ email })
        if(exists) return res.status(400).json({ message: "User exists!" })

        const pass = await bcrypt.hash(password, 10)
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const user = await userModel.create({
            name,
            email,
            password: pass,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000
        })

        try {
            await sendMail(email, otp)
        } catch (emailError) {
            console.error("Email sending failed:", emailError.message)
            // Continue even if email fails
        }

        res.status(201).json({
            message: "OTP sent",
            userID: user._id
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const verifyotp = async (req, res) => {
    try {
        const { userID, otp } = req.body
        const user = await userModel.findById(userID)

        if(!user || user.otp != otp || user.otpExpiry < Date.now()){
            return res.status(400).json({ message: "Invalid OTP" })
        }

        user.isVarified = true
        user.otp = null
        user.otpExpiry = null

        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.json({ token, user })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await userModel.findOne({ email })
        if(!user) 
            return res.status(400).json({ message: "Invalid credentials!" })
        
        if(!user.isVarified) 
            return res.status(400).json({ message: "Verify the Email first!" })

        const match = await bcrypt.compare(password, user.password)

        if(!match)
            return res.status(400).json({ message: "Invalid credentials!" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json({token, user})
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

//register
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender } = req.body;

        var profileImg = "";
        if (gender == "Male") {
            profileImg = `https://avatar.iran.liara.run/public/boy?username=${firstName}`;
        } else {
            profileImg = `https://avatar.iran.liara.run/public/girl?username=${firstName}`;
        }

        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, profileImg })

        await newUser.save()

        res.status(200).json({ message: "User registered successfully", user: newUser })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed", err: err.message })
    }
})

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid creadentials!" })
        }

        //generate jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;

        res.status(200).json({ token, user })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login failed", err: err.message })
    }

})

export default router;
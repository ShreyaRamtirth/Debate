import express from "express";
import bcrypt from 'bcryptjs';
import NodeMailer from 'nodemailer';
import pkg from "jsonwebtoken";

import { User } from "../model/user.js";

const Jwt = pkg;
const router = express.Router();
router.post('/register', (req, res) => {
    (async function () {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        })
        const result = await user.save();
        const { password, ...data } = result.toJSON();
        res.send(data);
    })().catch(err => {
        res.status(424).send({
            messaage: "Register unsuccessfull"
        });
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({
            messaage: "user not found"
        });
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            messaage: "Invalid Credentials"
        });
    }
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.send({
        jwt: token,
        role: user.role,
        name: user.name
    });
});

export default router;

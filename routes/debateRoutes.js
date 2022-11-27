import express from "express";
import { Debate } from "../model/debate.js";
import pkg from "jsonwebtoken";
const router = express.Router();
const Jwt = pkg;

router.post('/add', (req, res) => {
    (async function () {
        const token = req.headers.authorization;
        const claims = await Jwt.verify(token, "secret");
        const debate = new Debate({
            topic: req.body.topic,
            starting_date: req.body.starting_date,
            ending_date: req.body.ending_date,
            category: req.body.category,
            information: req.body.information,
            published_date: new Date(Date.now()).toISOString()
        })
        const result = await debate.save();
        res.send(result);
    })().catch(err => {
        res.status(424).send({
            messaage: "Add Debate unsuccessfull"
        });
    });
});



export default router;

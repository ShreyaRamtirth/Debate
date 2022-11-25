import express from "express";
import { Debate } from "../model/debate";

const router = express.Router();

router.post('/debate/add', (req, res) => {
    (async function () {
        const debate = new Debate({
            topic: req.body.topic,
            starting_date: req.body.starting_date,
            ending_date: req.body.ending_date,
            category: req.body.category,
            information: req.body.information,
            published_date: "25/11/2022"
        })
        console.log(debate);
        const result = await debate.save();
        res.send(result);
    })().catch(err => {
        res.status(424).send({
            messaage: "Add Debate unsuccessfull"
        });
    });
});

export default router;

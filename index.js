import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import debateRoutes from './routes/debateRoutes.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Database connected");
});
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/debate',debateRoutes);

app.listen(PORT, () => console.log(`Server is runnning on port : http://localhost:${PORT}`));
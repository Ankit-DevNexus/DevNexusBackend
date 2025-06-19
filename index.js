import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import Routes from './Routes/routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api", Routes);

// for testing
app.get('/', (req, res) => {
    res.send("Home");
})

//mongodb connection
app.listen(PORT, () => {
    console.log("App Started");
    mongoose.connect(uri);
    console.log("DB connected");
});
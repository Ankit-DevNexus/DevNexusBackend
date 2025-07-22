import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Routes from './Routes/routes.js';
import cors from 'cors';
import connectDB from "./config/connectWebsiteDB.js";

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
connectDB(uri);

app.use(cors());

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
});
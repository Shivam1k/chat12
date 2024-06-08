import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";





// Load environment variables from .env file
dotenv.config({});

const app = express();

// Access the PORT variable from the environment
const PORT = process.env.PORT || 5000;


// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin: 'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOption));
//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);




app.listen(PORT, () => {
    connectDB();
    console.log(`Listening on port ${PORT}`);
});

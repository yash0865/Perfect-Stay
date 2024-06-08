import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import bodyParser from 'body-parser';
import listingRouter from './routes/listing.js'
import bookingRouter from './routes/booking.js'
import userRouter from './routes/user.js'
import commentRouter from './routes/comment.js'

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(cors({
    origin:[""],
    methods:["POST","GET"],
    credentials:true
}));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/listing", listingRouter)
app.use("/booking", bookingRouter)
app.use("/user", userRouter)
app.use("/comment", commentRouter)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server listening on port : " + PORT);
        })
    })
    .catch(err => console.log(err))


import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import tweetRoute from './routes/tweetRoute.js';
import cors from 'cors';

dotenv.config({
    path: '.env'
});
databaseConnection();

const app = express();

const corsOptions = {
    origin: 'https://new-twitter-clone-fe.vercel.app',
    credentials: true
};
app.use(cors(corsOptions));

// CORS Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://new-twitter-clone-fe.vercel.app'); // You can use '*' for allowing all origins
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    // Optional: Setting the content-type header
    // res.setHeader('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});

import express from "express"
import cookieParser from "cookie-parser";
import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from 'cors';

const app = express()
databaseConnection();
const port=8080

//middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser())
app.use(function (req, res, next) {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    // Handle preflight requests
    next();
    });


// const corsOptions = {
//     origin:"https://new-twitter-clone-fe.vercel.app/",
//     // origin:"https://new-twitter-clone-bc.vercel.app/",
//     // origin:"https://new-twitter-clone-fe.vercel.app/",
//     credentials:true
// }


// Allow requests from specific origins
const allowedOrigins = [
    'https://new-twitter-clone-fe.vercel.app',
    'https://new-twitter-clone-bc.vercel.app',
    'http://localhost:3000'
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  };

app.use(cors(corsOptions));
//api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/tweet",tweetRoute)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"coming from backend..."
    })
})
app.get("/any",(req,res)=>{
    res.status(200).json({
        message:"Sab thik hai..."
    })
})

app.listen(port,()=>{
    console.log(`Server is listing at port ${port}`);
})
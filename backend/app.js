import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDb } from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js'
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.SECRET_USER,
  credentials: true
}));

app.use("/user", userRoutes);
app.use("/post",postRoutes)

async function serverstart(){
  try{

    await connectDb();

    app.listen(process.env.PORT,()=>{
      console.log(`Server start on ${process.env.PORT}`);
    })

  }catch(error){
    console.log(error);
  }
}

serverstart();
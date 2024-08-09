import path from 'path';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRouter.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users',userRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler)

app.listen(port,()=> console.log(`server stated on port ${port}`))
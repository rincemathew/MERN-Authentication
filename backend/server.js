import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRouter.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();


app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send('server is ready')
})


app.use(notFound);
app.use(errorHandler)

app.listen(port,()=> console.log(`server stated on port ${port}`))
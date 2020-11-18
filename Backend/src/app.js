import express, { json } from "express";
import morgan from "morgan";

// importing routes
import clientRouter from './routes/client';
import expenseRouter from './routes/expense';
import userRouter from './routes/user';
import productRouter from './routes/product';
import purchaseRouter from './routes/purchase';


// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

//Variables de entorno
require('dotenv').config();

// routes
app.use('/client',clientRouter);
app.use('/expense',expenseRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/purchase',purchaseRouter);

export default app;
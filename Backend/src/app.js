import express, { json } from "express";
import morgan from "morgan";

// importing routes
import clientRouter from "./routes/client";
import expenseRouter from "./routes/expense";
import userRouter from "./routes/user";
import productRouter from "./routes/product";
import purchaseRouter from "./routes/purchase";

// initialization
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(json());

//Variables de entorno
require("dotenv").config();

// Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type,Access-Control-Allow-Headers-Authorization,X-Requested-With ,Accept");
    next();
});
 
// routes
app.use("/client", clientRouter);
app.use("/expense", expenseRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/purchase", purchaseRouter);

export default app;

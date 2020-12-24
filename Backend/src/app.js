import express, { json } from "express";
import morgan from "morgan";

// importing routes
import clientRouter from "./routes/client";
import expenseRouter from "./routes/expense";
import userRouter from "./routes/user";
import productRouter from "./routes/product";
import purchaseRouter from "./routes/purchase";
import movementRouter from "./routes/movement";
import saleRouter from "./routes/sale";
import cashRouter from "./routes/cash";
import ReportRouter from "./routes/report";

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
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

// routes
app.use("/client", clientRouter);
app.use("/expense", expenseRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/purchase", purchaseRouter);
app.use("/movement", movementRouter);
app.use("/sale", saleRouter);
app.use("/cash", cashRouter);
app.use("/report",ReportRouter)

export default app;

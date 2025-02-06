import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
app.use(cookieParser());

// //Routes import
import productRouter from "./routes/product.routes.js";

//Routes Declaration
app.use("/api/v1", productRouter);

export { app };

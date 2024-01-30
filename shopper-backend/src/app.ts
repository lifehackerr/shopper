import express from 'express';
import mongoose from 'mongoose';
import NodeCache from 'node-cache';
import morgan from 'morgan';
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/products.js"
import orderRoutes from "./routes/orders.js"
import paymentRoutes from "./routes/payment.js"

import { config } from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
config({
    path:"./.env",
});

const port = process.env.PORT || 4000;
export const myCache = new NodeCache();
const app =  express();
app.use(express.json());
app.use(morgan("dev"))
mongoose.connect("mongodb://localhost:27017",{dbName: "ShopperDB"})
    .then((c) => {console.log(`MongoDB connected to ${c.connection.host}`);})
    .catch((error) => console.log(error));

// using routes
app.get("/", (req, res) => {
    res.send(`API working fine with /api/v1`)
})
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);





app.use("/uploads",express.static("uploads"));
app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`listening on port  ${port}`);
});
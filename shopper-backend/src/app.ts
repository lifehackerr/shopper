import express from 'express';
import mongoose from 'mongoose';
import userRoutes from "./routes/user.js"
import { errorMiddleware } from './middlewares/error.js';
const port = 4000;
const app =  express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017",{dbName: "ShopperDB"})
    .then((c) => {console.log(`MongoDB connected to ${c.connection.host}`);})
    .catch((error) => console.log(error));

// using routes
app.get("/", (req, res) => {
    res.send(`API working fine with /api/v1`)
})
app.use("/api/v1/user", userRoutes);
app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`listening on port  ${port}`);
});
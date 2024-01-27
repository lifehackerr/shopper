import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user.js';
const app = express.Router();


// Route: /api/v1/users/new
app.post("/new", newUser);
// Route: /api/v1/users/all
app.get("/all", getAllUsers);
// Route: /api/v1/users/id--- dynamic id
// app.get("/:id", getUser);
// app.delete("/:id", deleteUser);
app.route("/:id").get(getUser).delete(deleteUser);




export default app;
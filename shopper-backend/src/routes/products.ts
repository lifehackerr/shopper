import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { deleteProduct, getAdminProducts, getCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/products.js';
import { singleUpload } from '../middlewares/multer.js';
const app = express.Router();


// Route: /api/v1/product
app.post("/new",singleUpload,newProduct)
app.get("/latest",getLatestProducts);
app.get("/categories",getCategories);
app.get("/admin-products",getAdminProducts);
app.route("/:id").get(getSingleProduct).put(adminOnly,updateProduct).delete(adminOnly,deleteProduct)




export default app;
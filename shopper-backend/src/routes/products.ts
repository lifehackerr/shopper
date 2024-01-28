import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { deleteProduct, getAdminProducts, getAllProducts, getCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/products.js';
import { singleUpload } from '../middlewares/multer.js';
const app = express.Router();


// Route: /api/v1/product
app.post("/new",singleUpload,newProduct) // Create a new product -> api/v1/product/new
app.get("/latest",getLatestProducts); // Get the latest 5 product -> api/v1/product/latest
app.get("/all",getAllProducts); //to get all products with filer -> api/v1/product/all
app.get("/categories",getCategories); // Get all categories -> api/v1/product/categories
app.get("/admin-products",getAdminProducts); // Get all admin products -> api/v1/product/admin-products
app.route("/:id").get(getSingleProduct).put(adminOnly,updateProduct).delete(adminOnly,deleteProduct) //to get update and delete a product by id -> api/v1/product/:id


export default app;
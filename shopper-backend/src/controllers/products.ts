import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, searchRequestQuery } from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import * as fs from 'fs';

export const newProduct = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction) => {
    const {name,price,stock,category} = req.body;
    const photo = req.file;
    if(!photo) 
        return next(new ErrorHandler("Please add a photo",400));
    if(!name || !price || !stock || !category) 
    {
        fs.unlink(photo.path!,()=>{
            console.log("Deleted photo")
        })
        return next(new ErrorHandler("please provide all necessory details",400)); 
    }
    await Product.create({name,price,stock,category:category.toLowerCase(),photo:photo.path,})
    return res.status(201).json({success:true,message:"product created successfully"});
})


export const getLatestProducts = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction) => {
    const products = await Product.find({}).sort({createdAt:-1}).limit(5);
    return res.status(201).json({success:true,products});
})

export const getCategories = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction) => {
    const categories = await Product.distinct("category");
    return res.status(201).json({success:true,categories});
})

export const getAdminProducts = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction) => {
    const products = await Product.find({});
    return res.status(201).json({success:true,products});
})
export const getSingleProduct = TryCatch(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product) 
        return next(new ErrorHandler("Invalid product ID",404));
    return res.status(201).json({success:true,product});
})

export const updateProduct = TryCatch(async (req,res,next) => {
    const {id} = req.params;    
    const {name,price,stock,category} = req.body;
    const photo = req.file;
    const product = await Product.findById(id);

    if(!product) 
        return next(new ErrorHandler("Invalid product ID",404));
    if(photo) 
    {
        fs.unlink(product.photo,()=>{
            console.log("Old Deleted photo")
        })
        product.photo = photo.path;
    }
    if(name) product.name = name;
    if(price) product.price = price;
    if(stock) product.stock = stock;
    if(category) product.category = category;
    await product.save();
    return res.status(200).json({success:true,message:"product updated successfully"});
})

export const deleteProduct = TryCatch(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product) 
        return next(new ErrorHandler("Invalid product ID",404));
        fs.unlink(product.photo!,()=>{
            console.log("Deleted photo")
        })
    await product.deleteOne();
    return res.status(201).json({success:true,message: "product deleted successfully"});
})

export const getAllProducts = TryCatch(async (req: Request<{},{},{},searchRequestQuery>,res,next) => {
    const {search,sort,category,price} = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page -1)*limit;

    const baseQuery: BaseQuery ={}
    if (search){
        baseQuery.name = {
            $regex : search,
            $options : "i",
        }
    }
    if(price){
        baseQuery.price = { $lte: price}
    }
    if(category){
        baseQuery.category = category;
    }
    const productsPromise = Product.find(baseQuery).sort(sort && {price:sort ==="asc"? 1:-1}).limit(limit).skip(skip);
    const [products,filteredOnlyProducts] = await Promise.all([productsPromise,Product.find(baseQuery)])
    // const products = await Product.find(baseQuery).sort(sort && {price:sort ==="asc"? 1:-1}).limit(limit).skip(skip);
    // const filteredOnlyProducts = await Product.find(baseQuery);
    const totalPage = Math.ceil(filteredOnlyProducts.length/limit); 
    return res.status(201).json({success:true,products,totalPage});
})
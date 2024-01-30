import { myCache } from "../app.js";
import { Product } from "../models/products.js";
import { InvalidateCacheProps, OrderItemTypes} from "../types/types.js";

export const invalidateCache = async ({product,order,admin,userId,orderId,productId}: InvalidateCacheProps) =>{
    if(product){
        const productKeys : string[] = ["latest-product","categories","all-products",];
        if(typeof productId === "string"){
            productKeys.push(`Product-${productId}`);
        }
        if(typeof productId === "object"){
            productId.forEach((i) =>  productKeys.push(`Product-${i}`) );
        }
        myCache.del(productKeys)
    }
    if(order){
        const orderKeys : string[]= ["all-orders",`my-orders-${userId}`,`order-${orderId}`];
        const orders = await Product.find({}).select("_id");
        orders.forEach( (i) => {
            orderKeys.push(`order-${i._id}`);
        });
        myCache.del(orderKeys)


    }
    if(admin){

    }

}

export const reductStock = async (orderItems: OrderItemTypes[]) =>{
    for(let i = 0; i < orderItems.length; i++){
        const order= orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product){
            throw new Error("Product not found");
        }
        product.stock -= order.quantity;
        await product.save();


    }

}

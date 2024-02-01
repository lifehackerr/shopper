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
        myCache.del(["admin-stats","admin-pie-chart","admin-bar-charts","admin-line-charts"])


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

export const calculatePercentage = (thisMonth:number,lastMonth:number) =>{
    const percent = (thisMonth /lastMonth)*100;
    if(lastMonth  === 0){
        return thisMonth * 100;
    }
    return Number(percent.toFixed(0));
}

export const getInventories = async({categories,productsCount}:{categories:string[],productsCount:number})=>{
    const categoriesCountPromise = categories.map((category) =>Product.countDocuments({category}));
        const categoriesCount = await Promise.all(categoriesCountPromise);
        const categoryCount: Record<string,number>[] = [];
        categories.forEach((category,i) =>{
            categoryCount.push({
                [category]: Math.round((categoriesCount[i]/productsCount)*100),
            })
        }) 
        return categoryCount;

}
interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
  }
type FuncProps = {
    length: number;
    docArr: MyDocument[];
    today: Date;
    property?: "discount" | "total";
  };
export const getChartData = ({
    length,
    docArr,
    today,
    property,
  }: FuncProps) => {
    const data: number[] = new Array(length).fill(0);
  
    docArr.forEach((i) => {
      const creationDate = i.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
  
      if (monthDiff < length) {
        if (property) {
          data[length - monthDiff - 1] += i[property]!;
        } else {
          data[length - monthDiff - 1] += 1;
        }
      }
    });
  
    return data;
  };
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../Components/cart-item";
import { Link } from "react-router-dom";
const cartItems = [
  {
    productId:"jhbd",
    name:"Macbook",
    price:3000,
    stock:40,
    quantity:4,
    photo : "https://m.media-amazon.com/images/I/71eXNIDUGjL._SL1500_.jpg"
  }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges -discount;

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
  useEffect(() => { 
    const timeOutId = setTimeout(() =>{
      if(Math.random()>0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },100);
    return () =>{
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    }},[couponCode])
  return (
    <div className="cart">
      <main>
          {cartItems.length > 0 ? cartItems.map((i,idx)=> (<CartItem key = {idx} cartItem={i} />)
          ): <h1>No Items Added</h1>}
      </main>
      <aside>
          <p> Subtotal: ${subTotal}</p>
          <p> Shipping Charges: ${shippingCharges}</p>
          <p> tax: ${tax}</p>
          <p> Discount: <em className="red">${discount}</em></p>
          <p> Total: <b>${total}</b></p>
          <input type="text" placeholder="coupon code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)}></input>
        {
          couponCode && isValidCouponCode ? <span className="green"> ${discount} off using this <code> {couponCode}</code></span>:
          <span className="red">Invalid Coupon <VscError/></span>
        }
        {
          cartItems.length > 0 &&  <Link to= "/shipping"> Checkout</Link>
        }

      </aside>
    </div>
  )
}

export default Cart;

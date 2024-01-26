import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Shipping = () => {
    const[ shippingInfo, setShippingInfo] = useState({
        address: "",
        city:"",
        state: "",
        country: "",
        pinCode: ""
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>{
        setShippingInfo(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const navigate = useNavigate()
   return (
    <div className="shipping">
        <button className="back-btn" onClick={()=>navigate("/cart")}><BiArrowBack/></button>
        <form >
            <h1>Shipping Address</h1>
            <input required type= "text" placeholder="address" name="address" value={shippingInfo.address} onChange={changeHandler}></input>
            <input required type= "text" placeholder="city" name="city" value={shippingInfo.city} onChange={changeHandler}></input>
            <input required type= "text" placeholder="state" name="state" value={shippingInfo.state} onChange={changeHandler}></input>
            <select name="country" required value = {shippingInfo.country} onChange={changeHandler}>
                <option value="">Choose Country </option>
                <option value="India">India</option>
                <option value="China">China</option>
            </select>
            <input required type= "number" placeholder="pinCode" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler}></input>
            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping

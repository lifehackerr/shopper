import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
interface PropsType{
  user: User | null;
}
const Header = ({user}:PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = async() =>{
    try{
      await signOut(auth);
      toast.success("Signed Out successfully");
    }
    catch(error){
      toast.error("Failed to sign out");

    }
    
  }
  return (
    <nav className="header">
        <Link onClick={()=>setIsOpen((prev) => !prev)} to = "/">Home</Link>
        <Link to ="/search"><FaSearch/></Link>
        <Link to ="/cart"><FaShoppingBag/></Link>
        {user?._id ? 
        (<><button onClick={()=>setIsOpen(false)}><FaUser/></button>
        <dialog open= {isOpen}>
          <div>
              {user.role === "admin" && (<Link to ="/admin/dashboard">Admin</Link>)}
              <Link to = "/orders">orders</Link>
              <button onClick={logoutHandler}><FaSignOutAlt/></button>
          </div>
        </dialog>
        </>) : <Link to ="/login"><FaSignInAlt/></Link>}
    </nav>
  )
}

export default Header

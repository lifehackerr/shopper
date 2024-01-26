import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
const user = {_id: "asa", role: "admin"};
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = () =>{
    
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

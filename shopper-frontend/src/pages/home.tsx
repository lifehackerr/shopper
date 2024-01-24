import { Link } from "react-router-dom"
import ProductCard from "../Components/product-card"
const Home = () => {
  const addToCartHandler = () =>{};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to = "/search" className= "findmore">More</Link>
      </h1>
      <main>
        <ProductCard productId="jhbd" name="macbook" price={4500} stock={3} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/71eXNIDUGjL._SL1500_.jpg" />
      </main>
    </div>
  )
}

export default Home

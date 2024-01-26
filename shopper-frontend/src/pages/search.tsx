import { useState } from "react"
import ProductCard from "../Components/product-card"

const Saarch = () => {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [maxPrice, setMaxPrice] = useState(100000)
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1);
  const addToCartHandler = () =>{};
  const isPrevPage = page >1;
  const isNextPage = page <4;



  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value = {sort} onChange={(e)=> setSort(e.target.value)}>
          <option value ="">None</option>
          <option value ="asc">Prices(low to high)</option>
          <option value ="dsc">Prices(high to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input type ="range" min={100} max={10000} value = {maxPrice} onChange={(e)=> setMaxPrice(Number(e.target.value))}>
          </input>
        </div>
        <div>
          <h4>Category</h4>
          <select value = {category} onChange={(e)=> setCategory(e.target.value)}>
          <option value ="">All</option>
          <option value ="">sample1</option>
          <option value ="">sample2</option>
          </select>
        </div>
      </aside>
      <main>
          <h1>Products</h1>
          <input type="text" placeholder="search by name" value= {search} onChange={(e)=> setSearch(e.target.value)}/>
        <ProductCard productId="jhbd" name="macbook" price={4500} stock={3} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/71eXNIDUGjL._SL1500_.jpg" />
        <article> <button disabled={!isPrevPage} onClick={()=> setPage((prev)=> prev -1)}>prev</button><span>{page} of 4</span><button disabled={!isNextPage} onClick={()=> setPage((next)=> next+1)}>next</button></article>
      </main>
    </div>
  )
}

export default Saarch

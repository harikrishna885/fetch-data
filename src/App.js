import './App.css';
import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import { RotatingLines } from 'react-loader-spinner';

function App() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("https://dummyjson.com/products")
        if (response.ok) {
          const getProducts = await response.json()
          setProductsList(getProducts.products)
          setLoading(false)
        }
      }
      fetchData()

    } catch (error) {
      console.log(`The fetch data: ${error}`)
    }
  }, [])

  return (
    <div className="App-container">
      <div className='p-2 ps-4 fw-bold text-primary fs-5'>The Best Products</div>
      {loading ? 
      <div className='vh-100 d-flex justify-content-center'>
        <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />  
      </div> : <div>
        <ul className='products-container p-3'>
          {productsList.map((eachProduct) => (
            <Products key={eachProduct.id} productsDetails={eachProduct} />
          ))}
        </ul>
      </div>}
    </div>
  );
}

export default App;

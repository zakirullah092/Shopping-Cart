import React, { useEffect, useState } from "react";
import './ShoppingCart.css';

export default function ShoppingCart() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/');
        if (!response.ok) {
          setError('Error occurred while fetching data');
          return;
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        setError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  function handleAdd(item) {
    const newList = [...cartList, item];
    setCartList(newList);
  }

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function handleRemove(index) {
    const updatedCartList = cartList.filter((_, i) => i !== index);
    setCartList(updatedCartList);
  }

  return (
    <div className="main">
      <h2>Shopping Cart</h2>
      <div className="design">
        <div className="products">
          <h3 className="">Available Products</h3>
          <ul className="prodcutsUl">
            {list.map(item =>
              <li className="data" key={item.id}>
                <h3 className="category">{item.category}</h3>
                <h4>{item.title}</h4>
                <img src={item.image} alt="" style={{ width: '200px', height: '150px' }} />
                <p>{item.description}</p>
                <button onClick={() => handleAdd(item)}>Add to Cart</button>
              </li>
            )}
          </ul>
        </div>
        <div className="cart">
          <h3>Shopping Cart</h3>
          <ul>
            {cartList.map((item, index) =>
              <li key={index}>
                <h3>{item.title}</h3>
                <button onClick={() => handleRemove(index)}>Remove</button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <button className="toTop" onClick={backToTop}>Top</button>
    </div>
  );
}

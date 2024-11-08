import React, { useState } from "react";
import styles from "../styles/itemcount.module.scss";

const ItemCount = ({ stock, onAdd, productName }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(count);
    setCount(1);
  };

  return (
    <div className={styles.itemCount}>
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ItemCount;

import React, { useState } from "react";
import styles from "../styles/itemCount.module.scss";
import { toast } from "react-toastify";

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
    toast.success(`¡Añadiste ${count} ${productName} al carrito!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;

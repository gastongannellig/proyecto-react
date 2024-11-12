import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../styles/item.module.scss";
import ItemCount from "./ItemCount";

const Item = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = (count) => {
    addItemToCart(item, count);
    setAddedToCart(true);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className={styles.container}>
      <img src={item.pictureUrl} alt={item.title} />
      <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
        <h2>{item.title}</h2>
      </Link>
      <span className={expanded ? styles.expanded : styles.collapsed}>
        {item.description}
      </span>
      <button className={styles.toggleButton} onClick={toggleDescription}>
        {expanded ? "Read less" : "Read more"}
      </button>
      <span>${item.price}</span>
      {!addedToCart ? (
        <ItemCount
          stock={item.stock}
          onAdd={handleAddToCart}
          productName={item.title}
        />
      ) : (
        <button onClick={goToCart} className={styles.goToCartButton}>
          Go to cart
        </button>
      )}
    </div>
  );
};

export default Item;

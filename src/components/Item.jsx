import React, { useState } from "react";
import styles from "../styles/item.module.scss";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = (quantity) => {
    setAddedToCart(true);
  };

  return (
    <>
      <div className={styles.container}>
        <img src={item.pictureUrl} alt={item.title} />
        <Link to={`/detail/${item.id}`} style={{ textDecoration: "none" }}>
          <h2>{item.title}</h2>
        </Link>
        <span className={expanded ? styles.expanded : styles.collapsed}>
          {item.description}
        </span>
        <button className={styles.toggleButton} onClick={toggleDescription}>
          {expanded ? "Leer menos" : "Leer más"}
        </button>
        <span>{item.price}</span>
        <ItemCount
          stock={item.stock}
          onAdd={handleAddToCart}
          productName={item.title}
        />
      </div>
    </>
  );
};

export default Item;

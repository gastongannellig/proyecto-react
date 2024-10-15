import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/itemDetail.module.scss";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  const handleAddToCart = (quantity) => {};

  return (
    <div className={styles.detailContainer}>
      <img
        src={product.pictureUrl}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{product.price}</p>
        <ItemCount
          stock={product.stock}
          onAdd={handleAddToCart}
          productName={product.title}
        />
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};

export default ItemDetail;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../styles/itemdetail.module.scss";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  if (!product) {
    return <div>The product was not found.</div>;
  }

  const handleAddToCart = (count) => {
    addItemToCart(product, count);
    setQuantity(count);
    setAddedToCart(true);
  };

  const goToCart = () => {
    navigate("/cart");
  };

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

        {!addedToCart ? (
          <ItemCount
            stock={product.stock}
            onAdd={handleAddToCart}
            productName={product.title}
          />
        ) : (
          <button onClick={goToCart} className={styles.goToCartButton}>
            Go to cart
          </button>
        )}
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};

export default ItemDetail;

import React from "react";
import { useCart } from "../context/CartContext";
import cart from "../assets/cart.svg";
import styles from "../styles/cartwidget.module.scss";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className={styles["cart-widget"]}>
      <img src={cart} alt="cart" />
      {totalItems > 0 && (
        <span className={styles["cart-count"]}>{totalItems}</span>
      )}
    </Link>
  );
};

export default CartWidget;

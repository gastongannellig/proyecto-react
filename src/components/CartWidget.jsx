import React from "react";
import cart from "../assets/cart.svg";
import "../styles/cartWidget.scss";

const CartWidget = () => {
  return (
    <>
      <div className="cart-widget">
        <img src={cart} alt="cart" />
        <span className="cart-count">3</span>
      </div>
    </>
  );
};

export default CartWidget;

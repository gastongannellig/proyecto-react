import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/cart.module.scss";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const Cart = () => {
  const { cartItems, removeItemFromCart, clearCart, addItemToCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

  if (cartItems.length === 0 && !showReceipt) {
    return (
      <div className={styles.emptyCart}>
        <h2>There are no items in the cart.</h2>
        <Link to="/" className={styles.linkButton}>
          Return to the store
        </Link>
      </div>
    );
  }

  const total = cartItems
    .reduce((acc, item) => {
      const price = parseFloat(item.price.replace("$", "")) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return acc + price * quantity;
    }, 0)
    .toFixed(2);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    setPurchasedItems(cartItems);
    setIsLoading(true);

    const order = {
      buyer: {
        name: e.target[0].value,
        lastName: e.target[1].value,
        phone: e.target[2].value,
        email: e.target[3].value,
      },
      products: cartItems,
      total: total,
      timestamp: serverTimestamp(),
    };

    try {
      // Agrega la compra a Firestore
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Document written with ID: ", docRef.id);

      setTimeout(() => {
        setIsLoading(false);
        setShowReceipt(true);
        clearCart();
      }, 6000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
  };

  const receiptTotal = purchasedItems
    .reduce((acc, item) => {
      const price = parseFloat(item.price.replace("$", "")) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return acc + price * quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className={styles.container}>
      <h1>Purchase breakdown</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <button
              className={styles.removeButton}
              onClick={() => removeItemFromCart(item.id)}
            >
              X
            </button>
            <h3>{item.title}</h3>
            <img src={item.pictureUrl} alt={item.title} />
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <h3 className={styles.total}>Total: ${total}</h3>
      <button onClick={clearCart} className={styles.clearCartButton}>
        Empty cart
      </button>
      <button onClick={handleCheckoutClick} className={styles.checkoutButton}>
        Check Out
      </button>

      {showCheckout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {isLoading ? (
              <div className={styles["spinner-container"]}>
                <PropagateLoader
                  color="#7defd8"
                  size={20}
                  speedMultiplier={1}
                />
              </div>
            ) : showReceipt ? (
              <div className={styles.receiptContainer}>
                <h3>CONGRATULATIONS FOR YOUR PURCHASE</h3>
                <ul className={styles.receiptList}>
                  {purchasedItems.map((item, index) => (
                    <li key={index}>
                      <span>{item.title}</span>
                      <span>
                        {item.quantity} x {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <h4 className={styles.totalPrice}>Total: ${receiptTotal}</h4>{" "}
              </div>
            ) : (
              <form
                className={styles.checkoutForm}
                onSubmit={handleConfirmPurchase}
              >
                <label>
                  First name:
                  <input type="text" required />
                </label>
                <label>
                  Last name:
                  <input type="text" required />
                </label>
                <label>
                  Phone number:
                  <input type="tel" required />
                </label>
                <label>
                  Email:
                  <input type="email" required />
                </label>
                <button type="submit">CONFIRM PURCHASE</button>
              </form>
            )}
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowCheckout(false);
                setIsLoading(false);
                setShowReceipt(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        const existingItem = prevItems[existingItemIndex];
        const totalQuantity = existingItem.quantity + quantity;

        if (totalQuantity > product.stock) {
          toast.error("There is not enough stock available");
          return prevItems;
        }

        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: totalQuantity,
        };
        toast.success("Product added to cart");
        return updatedItems;
      } else {
        if (quantity > product.stock) {
          toast.error("There is not enough stock available");
          return prevItems;
        }

        toast.success("Product added to cart");
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

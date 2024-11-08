import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un producto al carrito
  const addItemToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      // Revisa si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      // Si ya existe, verificamos el stock disponible
      if (existingItemIndex >= 0) {
        const existingItem = prevItems[existingItemIndex];
        const totalQuantity = existingItem.quantity + quantity;

        // Si se supera el stock, mostramos alerta y salimos
        if (totalQuantity > product.stock) {
          toast.error("No hay suficiente stock disponible");
          return prevItems;
        }

        // Actualizamos la cantidad si el stock es suficiente
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: totalQuantity,
        };
        toast.success("Producto añadido al carrito");
        return updatedItems;
      } else {
        // Si no existe en el carrito, verificamos si la cantidad inicial es válida
        if (quantity > product.stock) {
          toast.error("No hay suficiente stock disponible");
          return prevItems;
        }

        // Si hay stock suficiente, lo agregamos al carrito
        toast.success("Producto añadido al carrito");
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
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

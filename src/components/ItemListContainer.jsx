import React from "react";
import "../styles/ItemListContainer.scss";

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <p>Este es un mensaje de bienvenida a la lista de productos.</p>
    </div>
  );
};
export default ItemListContainer;

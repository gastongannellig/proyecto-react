import React from "react";
import Item from "./Item";
import styles from "../styles/itemlist.module.scss";
import { NavLink } from "react-router-dom";

const ItemList = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.map((products) => {
        return <Item item={products} key={products.id} />;
      })}
    </div>
  );
};

export default ItemList;

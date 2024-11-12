import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemList from "./ItemList";
import styles from "../styles/itemlistcontainer.module.scss";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const q = categoryId
          ? query(
              collection(db, "products"),
              where("category", "==", categoryId)
            )
          : collection(db, "products");
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchItems, 1500);
  }, [categoryId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles["spinner-container"]}>
          <PropagateLoader color="#7defd8" size={20} speedMultiplier={1} />
        </div>
      ) : (
        <ItemList products={items} />
      )}
    </div>
  );
};

export default ItemListContainer;

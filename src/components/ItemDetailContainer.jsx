import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import styles from "../styles/itemlistcontainer.module.scss";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const numericId = parseInt(id);

        const q = query(
          collection(db, "products"),
          where("id", "==", numericId)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setProduct({ id: docData.id, ...docData.data() });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchProduct, 2000);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className={styles["spinner-container"]}>
          <PropagateLoader color={"#7defd8"} size={15} />
        </div>
      ) : (
        <ItemDetail product={product} />
      )}
    </>
  );
};

export default ItemDetailContainer;

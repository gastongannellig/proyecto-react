import React, { useEffect, useState } from "react";
import mockProducts from "../assets/mockData.json";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getProduct = new Promise((resolve) => {
      setTimeout(() => {
        const foundProduct = mockProducts.find(
          (item) => item.id === parseInt(id)
        );
        resolve(foundProduct);
      }, 2000);
    });

    getProduct.then((result) => {
      setProduct(result);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <PropagateLoader color={"#36d7b7"} size={15} />
        </div>
      ) : (
        <ItemDetail product={product} />
      )}
    </>
  );
};

export default ItemDetailContainer;

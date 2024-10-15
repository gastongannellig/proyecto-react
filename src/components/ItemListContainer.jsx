import React, { useEffect, useState } from "react";
import mockProducts from "../assets/mockData.json";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../styles/ItemListContainer.scss";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        let productsFiltered;
        if (categoryId) {
          productsFiltered = mockProducts.filter(
            (product) => product.category === categoryId
          );
        } else {
          productsFiltered = mockProducts;
        }
        resolve(productsFiltered);
      }, 2000);
    });

    getProducts.then((result) => {
      setProducts(result);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <PropagateLoader color={"#36d7b7"} size={15} />
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </>
  );
};

export default ItemListContainer;

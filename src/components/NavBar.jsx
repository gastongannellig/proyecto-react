import React, { useState, useEffect } from "react";
import styles from "../styles/navbar.module.scss";
import title from "../styles/brand.module.scss";
import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import TitleLogo from "./TitleLogo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const uniqueCategories = [
          ...new Set(querySnapshot.docs.map((doc) => doc.data().category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={title.logo}>
        <TitleLogo />
      </NavLink>
      <ul className={styles.navbarmenu}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.isActive : styles.notActive
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>

        <li className={styles.dropdown}>
          <span className={styles.dropbtn}>Products</span>
          <ul className={styles.dropdownContent}>
            {categories.map((category) => (
              <li key={category}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.isActive : styles.notActive
                  }
                  to={`/category/${category}`}
                >
                  {category}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.isActive : styles.notActive
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.isActive : styles.notActive
            }
            to={"/about"}
          >
            About Us
          </NavLink>
        </li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;

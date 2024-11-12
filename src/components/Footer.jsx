import React from "react";
import styles from "../styles/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <span className={styles.logo}>TuEshop</span>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            Contacto
          </a>
          <a href="#" className={styles.link}>
            Términos y condiciones
          </a>
        </div>
      </div>
      <p className={styles.credit}>
        © {new Date().getFullYear()} Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;

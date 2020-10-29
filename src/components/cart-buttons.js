import React from "react";
import styles from "./cart-buttons.module.css";
const CartButtons = () => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.primaryButton}>Check Out Now</button>
      <button className={styles.secondaryButton}>View Cart</button>
    </div>
  );
};

export default CartButtons;

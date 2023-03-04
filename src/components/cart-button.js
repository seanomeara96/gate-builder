import React from "react"
import styles from "./cart-button.module.css"
export const CartButton = (props) => {
  return (
    <button
      className={`${styles.button} ${styles.button__smallButton}`}
      onClick={props.clickHandler}
    >
      Add Bundle To Cart
    </button>
  );
};

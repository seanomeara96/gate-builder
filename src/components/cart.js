import React from "react";
import styles from "./cart.module.css";
import CartButtons from "./cart-buttons";
const Cart = ({ cartContents, isOpen, totalCartItems }) => {
  const contents = cartContents.map((item, index) => (
    <div key={index} className={styles.result}>
      <h3 className={styles.result__name}>{item.name}</h3>
      <span className={styles.result__price}>
        €{item.price} &times; {item.qty}
      </span>
    </div>
  ));

  return isOpen === true ? (
    <div className={styles.cart}>
      {totalCartItems > 0 ? (
        <div style={{ padding: "3rem" }}>
          {contents}
          <CartButtons />
        </div>
      ) : (
        <div style={{ padding: "3rem" }}>
          Nothing to see here. Add some items to your cart
        </div>
      )}
    </div>
  ) : (
    ""
  );
};
export default Cart;

import React from "react";
import styles from "./cart.module.css";
import CartButtons from "./cart-buttons";
const Cart = (props) => {
  console.log(props.cartContents, "props.cartContents");
  let contents = [];
  for (var x in props.cartContents) {
    if (props.cartContents[x] > 0) {
      contents.push(
        <div key={x} className={styles.result}>
          <h3 className={styles.result__name}>{props.options[x].name}</h3>
          <span className={styles.result__price}>
            €{props.options[x].price} &times; {props.cartContents[x]}
          </span>
        </div>
      );
    }
  }
  return props.isOpen === true ? (
    <div className={styles.cart}>
      {props.totalCartItems > 0 ? (
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

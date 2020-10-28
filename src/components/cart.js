import React from "react";
import styles from "./cart.module.css";
import CartButtons from "./cart-buttons";
const Cart = (props) => {
  console.log(props.cartContents, "props.cartContents");
  let contents = [];
  for (var x in props.cartContents) {
    if (props.cartContents[x] > 0) {
      contents.push(
        <div key={x}>
          <h3>{props.options[x].name}</h3>
          <span>{props.options[x].price}</span>
        </div>
      );
    }
  }
  return props.isOpen === true ? (
    <div className={styles.cart}>
      {props.totalCartItems > 0 ? (
        <div>
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

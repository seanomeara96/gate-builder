import React from "react";
import { CartButton } from "./cart-button";
import styles from "./results-card.module.css";
export const ResultsCard = (props) => {
  const gate = props.bundle[0];

  const listItem = props.abbrBundle.map((item, index) => (
    <li key={index} className={styles.resultsCard__title}>
      {item.name} &times; {item.qty}
    </li>
  ));

  const images = props.bundle.map((component, index) => (
    <img
      key={index}
      style={{
        zIndex: props.bundle.length - index,
      }}
      alt={component.name}
      className={styles.resultsCard__img}
      src={component.img}
    />
  ));

  return (
    <div className={styles.resultsCard}>
      <div className={styles.wrapper}>
        <div className={styles.resultsCard__content}>
          <div className={styles.wrapper}>
            <h2 className={styles.resultsCard__heading}>
              {props.totalBundleMaxLength - gate.tolerance}
              cm - {props.totalBundleMaxLength}cm Bundle
            </h2>
            <div className={styles.resultsCard__imgs}>{images}</div>
            <details open={window.screen.width > 600 ? true : false}>
              <summary>
                {props.bundle.reduce(
                  (a, c) => (c.type === "gate" ? a + 1 : a),
                  0
                )}{" "}
                Gate and{" "}
                {props.bundle.reduce(
                  (a, c) => (c.type === "extension" ? a + 1 : a),
                  0
                )}{" "}
                Extensions
              </summary>
              <ul>{listItem}</ul>
            </details>
            <CartButton clickHandler={props.clickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
